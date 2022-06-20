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
        try {
            dispatch({type: ChannelsActionTypes.setChannelsDataState, payload: dataStates.requested})
            const response = await axios.get<Channel[]>(ApiRoutes.GetChannels)
            if (response.data) {
                dispatch({type: ChannelsActionTypes.setChannels, payload: response.data})
            }

            dispatch({type: ChannelsActionTypes.setChannelsDataState, payload: dataStates.received})
        } catch (error) {
            dispatch({type: ChannelsActionTypes.setChannelsDataState, payload: dataStates.error})
        }
    }
}


function createCreateChannelForm(name: string): FormData {
    const form = new FormData();
    form.append('name', name)
    return form
}

export const fetchCreateChannel = (channelName: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createCreateChannelForm(channelName)
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.CreateChannel,
                    state: {status: 200, code: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.post<Channel>(ApiRoutes.CreateChannel, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

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
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.CreateChannel, state: {
                        status: error.status, code: String(error.response.data.code),
                        dataState: dataStates.error
                    }
                }
            })
        }
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
        try {
            const form = createRenameChannelForm(channelId, newChannelName)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.RenameChannel,
                    state: {status: 200, code: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.put<Channel>(ApiRoutes.RenameChannel, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

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

        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.RenameChannel, state: {
                        status: error.status, code: String(error.response.data.code),
                        dataState: dataStates.error
                    }
                }
            })
        }
    }
}