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
        dispatch({
            type: KeyActionTypes.setKeysDataState, payload: {
                channelId: channelId,
                dataState: dataStates.requested
            }
        })
        axios(ApiRoutes.GetKeys, {
            params: {'channel_id': channelId}
        }).then(response => {
            if (response.data) {
                dispatch({type: KeyActionTypes.setKeys, payload: {channelId: channelId, keys: response.data}})
                dispatch({
                    type: KeyActionTypes.setKeysDataState, payload: {
                        channelId: channelId,
                        dataState: dataStates.received
                    }
                })
            }
        }).catch(() => {
            dispatch({
                type: KeyActionTypes.setKeysDataState, payload: {
                    channelId: channelId,
                    dataState: dataStates.error
                }
            })
        })
    }
}


function createCreateKeyForm(name: string, permission: string,
                             channelId: string, allowInfo: boolean, disallowMixins: boolean): FormData {
    const form = new FormData();
    form.append('name', name)
    form.append('id', channelId)
    form.append('permissions', permission)
    form.append('info_allowed', String(Number(allowInfo)))
    form.append('disallow_mixins', String(Number(disallowMixins)))
    return form
}

export const fetchCreateKey = (keyName: string, permission: string, channelId: string, allowInfo: boolean,
                               disallowMixins: boolean) => {
    return async (dispatch: Dispatch<rootActions>) => {
        const form = createCreateKeyForm(keyName, permission, channelId, allowInfo, disallowMixins)

        dispatch({
            type: FetchActionTypes.setFetch,
            payload: {
                identifier: ApiRoutes.Grant,
                state: {status: 200, code: '', dataState: dataStates.requested}
            }
        })

        axios.post<Key>(ApiRoutes.Grant, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            if (response.data) {
                dispatch({type: KeyActionTypes.addKey, payload: {channelId: channelId, key: response.data}})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.Grant,
                        state: {status: 200, code: '', dataState: dataStates.received}
                    }
                })
                dispatch({
                    type: ChannelsActionTypes.plusActiveKeys,
                    payload: {channelId: channelId, keyType: response.data.read ? 'read_keys' : 'write_keys', count: 1}
                })

            }
        }).catch((error: AxiosError) => {
            const data = error.response?.data as ({ code: number } | undefined)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Grant, state: {
                        status: Number(error.status) || 0, code: String(data?.code || 0),
                        dataState: dataStates.error
                    }
                }
            })
        })
    }
}


function createToggleKeyForm(keyId: string): FormData {
    const form = new FormData();
    form.append('key', keyId)
    return form
}

export const fetchToggleKey = (key: Key) => {
    return async (dispatch: Dispatch<rootActions>) => {
        const form = createToggleKeyForm(key.key)

        dispatch({
            type: FetchActionTypes.setFetch,
            payload: {
                identifier: ApiRoutes.ToggleKey + key.key,
                state: {status: 200, code: '', dataState: dataStates.requested}
            }
        })

        axios.put<Key>(ApiRoutes.ToggleKey, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            if (response.data) {
                const keyType = key.read ? 'read_keys' : 'write_keys'
                dispatch({type: KeyActionTypes.replaceKey, payload: {channelId: key.channel, key: response.data}})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.ToggleKey + key.key,
                        state: {status: 200, code: '', dataState: dataStates.received}
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
        }).catch((error: AxiosError) => {
            const data = error.response?.data as ({ code: number } | undefined)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ToggleKey + key.key,
                    state: {
                        status: Number(error.status) || 0,
                        code: String(data?.code || 0),
                        dataState: dataStates.error
                    }
                }
            })
        })
    }
}


function createDeleteKeyForm(keyId: string): FormData {
    const form = new FormData();
    form.append('key', keyId)
    return form
}

export const fetchDeleteKey = (channelId: string, keyToDelete: Key) => {
    return async (dispatch: Dispatch<rootActions>) => {
        const form = createDeleteKeyForm(keyToDelete.key)

        axios.post<{ key: string }>(ApiRoutes.DeleteKey, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            if (response.data && response.data['key'] === keyToDelete.key) {
                const active = keyToDelete.active ? ChannelsActionTypes.plusActiveKeys : ChannelsActionTypes.plusInactiveKeys
                const keyType = keyToDelete.read ? 'read_keys' : 'write_keys'
                dispatch({
                    type: KeyActionTypes.deleteKey,
                    payload: {channelId: channelId, keyId: response.data['key']}
                })

                dispatch({type: active, payload: {channelId: channelId, keyType: keyType, count: -1}})
            }
        }).catch(() => {})
    }
}
