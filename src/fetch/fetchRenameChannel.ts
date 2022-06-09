import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {ChannelsActionTypes} from "../store/reducers/channelsReducer";
import {FetchActionTypes} from "../store/reducers/fetchReducer";
import {dataStates} from "../store/reducers/consts";
import {ApiRoutes} from "./apiRoutes";

function createForm(id: string, name: string): FormData {
    const form = new FormData();
    form.append('id', id)
    form.append('name', name)
    return form
}

export const fetchRenameChannel = (channelId: string, newChannelName: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(channelId, newChannelName)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.RenameChannel,
                    state: {status: 200, message: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.put(ApiRoutes.RenameChannel, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data) {
                dispatch({type: ChannelsActionTypes.deleteChannel, payload: channelId})
                dispatch({type: ChannelsActionTypes.addChannel, payload: response.data})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.RenameChannel,
                        state: {status: 200, message: '', dataState: dataStates.received}
                    }
                })
            }

        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.RenameChannel, state: {
                        status: error.status, message: error.response.data.message,
                        dataState: dataStates.error
                    }
                }
            })
        }
    }
}