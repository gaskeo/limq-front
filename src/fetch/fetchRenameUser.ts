import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {UserActionTypes} from "../store/reducers/userReducer";
import {FetchActionTypes} from "../store/reducers/fetchReducer";
import {dataStates} from "../store/reducers/consts";
import {ApiRoutes} from "./apiRoutes";

function createForm(newUsername: string): FormData {
    const form = new FormData();
    form.append('new_username', newUsername)
    return form
}

export const fetchRenameUser = (newUsername: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(newUsername)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.RenameUser,
                    state: {status: 200, message: '', dataState: dataStates.requested}
                }
            })
            const response = await axios.put(ApiRoutes.RenameUser, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.RenameUser,
                        state: {status: 200, message: '', dataState: dataStates.received}
                    }
                })
            }
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.RenameUser, state: {
                        status: error.status, message:
                        error.response.data.message, dataState: dataStates.received
                    }
                }
            })
        }
    }
}