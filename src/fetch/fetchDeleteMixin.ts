import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {MixinActionTypes, MixinTypeStates} from "../store/reducers/mixinsReducer";

function createForm(subject: string, channelId: string): FormData {
    const form = new FormData();
    form.append('subject', subject)
    form.append('channel', channelId)

    return form
}

export const fetchDeleteMixin = (subject: string, channelId: string, mixinType: MixinTypeStates) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(subject, channelId)

            const response = await axios.post(
                mixinType === MixinTypeStates.in ? '/do/restrict_in_mx' : '/do/restrict_out_mx', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data && response.data['mixin']) {
                dispatch({type: MixinActionTypes.deleteMixin, payload: {channelId: subject,
                        mixinId: response.data['mixin'], mixinType: mixinType}})
            }
        }
        catch (error: AxiosError | any) {
            console.log(error)
        }
    }
}