import {Dispatch} from "@reduxjs/toolkit";
import {Channel, channelAction, ChannelsActionTypes} from "../reducers/channelsReducer";
import {dataStates} from "../reducers/consts";
import axios, {AxiosError} from "axios";
import {ApiRoutes} from "./apiRoutes";
import {rootActions} from "../reducers";
import {FetchActionTypes} from "../reducers/fetchReducer";
import {PathActionTypes} from "../reducers/pathReducer";

export const fetchChannels = () => {
    return async (dispatch: Dispatch<channelAction>) => {
        dispatch({type: ChannelsActionTypes.setChannelsDataState, payload: dataStates.requested})
        axios.get<Channel[]>(ApiRoutes.GetChannels).then(response => {
            if (response.data) {
                dispatch({type: ChannelsActionTypes.setChannels, payload: response.data})
            }

            dispatch({type: ChannelsActionTypes.setChannelsDataState, payload: dataStates.received})
        }).catch(() => {
            dispatch({type: ChannelsActionTypes.setChannelsDataState, payload: dataStates.error})

        })
    }
}


function createCreateChannelForm(name: string,
                                 messageSize: number,
                                 needBufferization: boolean,
                                 bufferedMessageCount: number,
                                 bufferedDataPersistency: number,
                                 endToEndDataEncryption: boolean): FormData {
    const form = new FormData();
    form.append('name', name)
    form.append('max_message_size', messageSize.toString())
    form.append('need_bufferization', needBufferization ? '1' : '0')
    form.append('buffered_message_count', bufferedMessageCount.toString())
    form.append('buffered_data_persistency', bufferedDataPersistency.toString())
    form.append('end_to_end_data_encryption', endToEndDataEncryption ? '1' : '0')
    return form
}

export const fetchCreateChannel = (channelName: string,
                                   messageSize: number,
                                   needBufferization: boolean,
                                   bufferedMessageCount: number,
                                   bufferedDataPersistency: number,
                                   endToEndDataEncryption: boolean) => {
    return async (dispatch: Dispatch<rootActions>) => {
        const form = createCreateChannelForm(channelName, messageSize, needBufferization,
            bufferedMessageCount, bufferedDataPersistency, endToEndDataEncryption)

        dispatch({
            type: FetchActionTypes.setFetch,
            payload: {
                identifier: ApiRoutes.CreateChannel,
                state: {status: 200, code: '', dataState: dataStates.requested}
            }
        })

        axios.post<Channel>(ApiRoutes.CreateChannel, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            if (response.data) {
                dispatch({type: ChannelsActionTypes.addChannel, payload: response.data})
            }
            dispatch({type: PathActionTypes.deletePath})
            dispatch({type: PathActionTypes.setPath, payload: '/'})
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.CreateChannel,
                    state: {status: 200, code: '', dataState: dataStates.received}
                }
            })
        }).catch((error: AxiosError) => {
            const data = error.response?.data as ({ code: number } | undefined)
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.CreateChannel, state: {
                        status: Number(error.status) || 0, code: String(data?.code || 0),
                        dataState: dataStates.error
                    }
                }
            })
        })
    }
}


function createRenameChannelForm(id: string, name: string): FormData {
    const form = new FormData();
    form.append('id', id)
    form.append('name', name)
    return form
}

export const fetchRenameChannel = (channelId: string, newChannelName: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        const form = createRenameChannelForm(channelId, newChannelName)

        dispatch({
            type: FetchActionTypes.setFetch,
            payload: {
                identifier: ApiRoutes.RenameChannel,
                state: {status: 200, code: '', dataState: dataStates.requested}
            }
        })

        axios.put<Channel>(ApiRoutes.RenameChannel, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            if (response.data) {
                dispatch({type: ChannelsActionTypes.deleteChannel, payload: channelId})
                dispatch({type: ChannelsActionTypes.addChannel, payload: response.data})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.RenameChannel,
                        state: {status: 200, code: '', dataState: dataStates.received}
                    }
                })
            }
        }).catch((error: AxiosError) => {
            const data = error.response?.data as ({ code: number } | undefined)
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.RenameChannel, state: {
                        status: Number(error.status) || 0, code: String(data?.code || 0),
                        dataState: dataStates.error
                    }
                }
            })
        })
    }
}
