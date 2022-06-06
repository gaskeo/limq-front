import {Dispatch} from "@reduxjs/toolkit";
import {rootActions} from "../store/reducers";
import axios, {AxiosError} from "axios";
import {dataStates} from "../store/reducers/consts";
import {MixinActionTypes} from "../store/reducers/mixinsReducer";


export const fetchGetMixins = (channelId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {

            dispatch({type: MixinActionTypes.setMixinsDataState, payload: {channelId: channelId,
                    dataState: dataStates.requested}})

            const response = await axios('/do/get_mixins', {params: {'channel_id': channelId}
            })

            if (response.data) {
                dispatch({type: MixinActionTypes.setMixins, payload: {channelId: channelId, mixins: response.data}})
                dispatch({type: MixinActionTypes.setMixinsDataState, payload: {channelId: channelId,
                        dataState: dataStates.received}})
            }
        }
        catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}