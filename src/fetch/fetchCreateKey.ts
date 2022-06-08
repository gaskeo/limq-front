import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {KeyActionTypes} from "../store/reducers/keysReducer";
import {FetchActionTypes} from "../store/reducers/fetchReducer";
import {dataStates} from "../store/reducers/consts";
import {ApiRoutes} from "./apiRoutes";

function createForm(name: string, permission: string, channelId: string, allowInfo: boolean): FormData {
    const form = new FormData();
    form.append('name', name)
    form.append('id', channelId)
    form.append('permissions', permission)
    form.append('info_allowed', String(Number(allowInfo)))

    return form
}

export const fetchCreateKey = (keyName: string, permission: string, channelId: string, allowInfo: boolean) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(keyName, permission, channelId, allowInfo)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Grant,
                    state: {status: 200, message: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.post(ApiRoutes.Grant, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data) {
                dispatch({type: KeyActionTypes.addKey, payload: {channelId: channelId, key: response.data}})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.Grant,
                        state: {status: 200, message: '', dataState: dataStates.received}
                    }
                })
            }
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Grant, state: {
                        status: error.status, message: error.response.data.message,
                        dataState: dataStates.error
                    }
                }
            })
        }
    }
}