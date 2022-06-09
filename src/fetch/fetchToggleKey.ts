import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {KeyActionTypes} from "../store/reducers/keysReducer";
import {ApiRoutes} from "./apiRoutes";
import {FetchActionTypes} from "../store/reducers/fetchReducer";
import {dataStates} from "../store/reducers/consts";

function createForm(keyId: string): FormData {
    const form = new FormData();
    form.append('key', keyId)
    return form
}

export const fetchToggleKey = (channelId: string, keyId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(keyId)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ToggleKey + keyId,
                    state: {status: 200, message: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.put(ApiRoutes.ToggleKey, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data) {
                dispatch({type: KeyActionTypes.replaceKey, payload: {channelId: channelId, key: response.data}})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.ToggleKey + keyId,
                        state: {status: 200, message: '', dataState: dataStates.received}
                    }
                })
            }
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ToggleKey + keyId,
                    state: {status: error.status, message: '', dataState: dataStates.error}
                }
            })
        }
    }
}