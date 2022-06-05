import {channelAction, ChannelsActionTypes} from "../store/reducers/channelsReducer";
import {dataStates} from "../store/reducers/consts";
import {Dispatch} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChannels = () => {
    return async (dispatch: Dispatch<channelAction>) => {
        try {
            dispatch({type: ChannelsActionTypes.setChannelsDataState, payload: dataStates.requested})
            const response = await axios('/do/get_channels')
            if (response.data) {
                dispatch({type: ChannelsActionTypes.setChannels, payload: response.data})
            }

            dispatch({type: ChannelsActionTypes.setChannelsDataState, payload: dataStates.received})
        }
        catch (error) {
            dispatch({type: ChannelsActionTypes.setChannelsDataState, payload: dataStates.error})
        }
    }
}