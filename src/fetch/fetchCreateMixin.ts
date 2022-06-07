import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {MixinActionTypes, MixinTypeStates} from "../store/reducers/mixinsReducer";
import {FetchActionTypes} from "../store/reducers/fetchReducer";
import {dataStates} from "../store/reducers/consts";

function createForm(channelId: string, keyId: string): FormData {
    const form = new FormData();
    form.append('channel', channelId)
    form.append('key', keyId)

    return form
}

export const fetchCreateMixin = (channelId: string, keyId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(channelId, keyId)
            dispatch({type: FetchActionTypes.setFetch,
                payload: {identifier: 'createMixin', state: {status: 200, message: '', dataState: dataStates.requested}}})
            const response = await axios.post('/do/create_mixin', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data && response.data['mixin']) {
                dispatch({type: MixinActionTypes.addMixin, payload: {channelId: channelId,
                        mixin: response.data['mixin'], mixinType: MixinTypeStates.in}})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: 'createMixin',
                        state: {status: 200, message: '', dataState: dataStates.received}
                    }
                })
            }
        }
        catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: 'createMixin', state: {
                        status: error.status, message: error.response.data.message,
                        dataState: dataStates.error
                    }
                }
            })
        }
    }
}