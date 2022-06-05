import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {ChannelsActionTypes} from "../store/reducers/channelsReducer";

function createForm(id: string, name: string): FormData {
    const form = new FormData();
    form.append('id', id)
    form.append('name', name)
    return form
}

export const fetchChangeChannelName = (channelId: string, newChannelName: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(channelId, newChannelName)

            const response = await axios.post('/do/edit_channel', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data) {
                dispatch({type: ChannelsActionTypes.deleteChannel, payload: channelId})
                dispatch({type: ChannelsActionTypes.addChannel, payload: response.data})
            }
        }
        catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}