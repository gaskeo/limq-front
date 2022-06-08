import {Dispatch} from "@reduxjs/toolkit";
import {PathActionTypes} from "../store/reducers/pathReducer";
import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {FetchActionTypes} from "../store/reducers/fetchReducer";
import {dataStates} from "../store/reducers/consts";
import {ApiRoutes} from "./apiRoutes";

function createForm(email: string, username: string, password: string): FormData {
    const form = new FormData();
    form.append('email', email)
    form.append('username', username)
    form.append('password', password)
    return form
}

export const fetchRegister = (email: string, username: string, password: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(email, username, password)
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Register,
                    state: {status: 0, message: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.post(ApiRoutes.Register, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['status']) {
                dispatch({type: PathActionTypes.deletePath})
                dispatch({type: PathActionTypes.setPath, payload: response.data['path']})
            }
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Register, state: {
                        status: error.status, message: error.response.data.message,
                        dataState: dataStates.error
                    }
                }
            })
        }
    }
}