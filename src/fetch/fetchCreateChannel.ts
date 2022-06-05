import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {PathActionTypes} from "../store/reducers/pathReducer";
import {ChannelsActionTypes} from "../store/reducers/channelsReducer";

function createForm(name: string): FormData {
    const form = new FormData();
    form.append('name', name)
    return form
}

export const fetchCreateChannel = (channelName: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(channelName)

            const response = await axios.post('/do/create_channel', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data) {
                dispatch({type: ChannelsActionTypes.addChannel, payload: response.data})
            }

            dispatch({type: PathActionTypes.deletePath})
            dispatch({type: PathActionTypes.setPath, payload: '/'})
        }
        catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}