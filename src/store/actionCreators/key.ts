import {Dispatch} from "@reduxjs/toolkit";
import {rootActions} from "../reducers";
import {Key, KeyActionTypes} from "../reducers/keysReducer";
import {dataStates} from "../reducers/consts";
import axios, {AxiosError} from "axios";
import {ApiRoutes} from "./apiRoutes";
import {FetchActionTypes} from "../reducers/fetchReducer";
import {ChannelsActionTypes} from "../reducers/channelsReducer";

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

            const response = await axios.post<Key>(ApiRoutes.Grant, form, {
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
                dispatch({
                    type: ChannelsActionTypes.plusActiveKeys,
                    payload: {channelId: channelId, keyType: response.data.read ? 'read_keys' : 'write_keys', count: 1}
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

export const fetchToggleKey = (key: Key) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createToggleKeyForm(key.key)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ToggleKey + key.key,
                    state: {status: 200, message: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.put<Key>(ApiRoutes.ToggleKey, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data) {
                const keyType = key.read ? 'read_keys' : 'write_keys'
                dispatch({type: KeyActionTypes.replaceKey, payload: {channelId: key.channel, key: response.data}})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.ToggleKey + key.key,
                        state: {status: 200, message: '', dataState: dataStates.received}
                    }
                })
                dispatch({
                    type: key.active ? ChannelsActionTypes.plusActiveKeys : ChannelsActionTypes.plusInactiveKeys,
                    payload: {channelId: key.channel, keyType: keyType, count: -1}
                })
                dispatch({
                    type: key.active ? ChannelsActionTypes.plusInactiveKeys : ChannelsActionTypes.plusActiveKeys,
                    payload: {channelId: key.channel, keyType: keyType, count: 1}
                })
            }
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ToggleKey + key.key,
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

export const fetchDeleteKey = (channelId: string, key: Key) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createDeleteKeyForm(key.key)

            const response = await axios.post<{key: string}>(ApiRoutes.DeleteKey, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data && response.data['key'] === key.key) {
                const active = key.active ? ChannelsActionTypes.plusActiveKeys : ChannelsActionTypes.plusInactiveKeys
                const keyType = key.read ? 'read_keys' : 'write_keys'
                dispatch({
                    type: KeyActionTypes.deleteKey,
                    payload: {channelId: channelId, keyId: response.data['key']}
                })

                dispatch({type: active, payload: {channelId: channelId, keyType: keyType, count: -1}})
            }

        } catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}
