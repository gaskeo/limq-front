import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {MixinActionTypes, MixinTypeStates} from "../store/reducers/mixinsReducer";

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

            const response = await axios.post('/do/create_mixin', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data && response.data['mixin']) {
                dispatch({type: MixinActionTypes.addMixin, payload: {channelId: channelId,
                        mixin: response.data['mixin'], mixinType: MixinTypeStates.in}})
            }
        }
        catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}