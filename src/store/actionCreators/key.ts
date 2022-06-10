import {Dispatch} from "@reduxjs/toolkit";
import {rootActions} from "../reducers";
import {KeyActionTypes} from "../reducers/keysReducer";
import {dataStates} from "../reducers/consts";
import axios, {AxiosError} from "axios";
import {ApiRoutes} from "./apiRoutes";
import {FetchActionTypes} from "../reducers/fetchReducer";

export const fetchGetKeys = (channelId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {

            dispatch({
                type: KeyActionTypes.setKeysDataState, payload: {
                    channelId: channelId,
                    dataState: dataStates.requested
                }
            })

            const response = await axios(ApiRoutes.GetKeys, {
                params: {'channel_id': channelId}
            })

            if (response.data) {
                dispatch({type: KeyActionTypes.setKeys, payload: {channelId: channelId, keys: response.data}})
                dispatch({
                    type: KeyActionTypes.setKeysDataState, payload: {
                        channelId: channelId,
                        dataState: dataStates.received
                    }
                })
            }
        } catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}


function createCreateKeyForm(name: string, permission: string, channelId: string, allowInfo: boolean): FormData {
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
            const form = createCreateKeyForm(keyName, permission, channelId, allowInfo)

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


function createToggleKeyForm(keyId: string): FormData {
    const form = new FormData();
    form.append('key', keyId)
    return form
}

export const fetchToggleKey = (channelId: string, keyId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createToggleKeyForm(keyId)

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


function createDeleteKeyForm(keyId: string): FormData {
    const form = new FormData();
    form.append('key', keyId)
    return form
}

export const fetchDeleteKey = (channelId: string, keyId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createDeleteKeyForm(keyId)

            const response = await axios.post(ApiRoutes.DeleteKey, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data && response.data['key'] === keyId) {
                dispatch({type: KeyActionTypes.deleteKey,
                    payload: {channelId: channelId, keyId: response.data['key']}})
            }

        }
        catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}
