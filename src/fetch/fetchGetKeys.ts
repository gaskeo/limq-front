import {Dispatch} from "@reduxjs/toolkit";
import {rootActions} from "../store/reducers";
import axios, {AxiosError} from "axios";
import {KeyActionTypes} from "../store/reducers/keysReducer";
import {dataStates} from "../store/reducers/consts";
import {ApiRoutes} from "./apiRoutes";


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