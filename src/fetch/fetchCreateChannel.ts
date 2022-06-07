import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {PathActionTypes} from "../store/reducers/pathReducer";
import {ChannelsActionTypes} from "../store/reducers/channelsReducer";
import {FetchActionTypes} from "../store/reducers/fetchReducer";
import {dataStates} from "../store/reducers/consts";

function createForm(name: string): FormData {
    const form = new FormData();
    form.append('name', name)
    return form
}

export const fetchCreateChannel = (channelName: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(channelName)
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: 'createChannel',
                    state: {status: 200, message: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.post('/do/create_channel', form, {
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
                    identifier: 'createChannel',
                    state: {status: 200, message: '', dataState: dataStates.received}
                }
            })
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: 'createChannel', state: {
                        status: error.status, message: error.response.data.message,
                        dataState: dataStates.error
                    }
                }
            })
        }
    }
}