import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {MixinActionTypes, MixinTypeStates} from "../store/reducers/mixinsReducer";
import {ApiRoutes} from "./apiRoutes";

function createForm(subject: string, channelId: string, mixinType: MixinTypeStates): FormData {
    const form = new FormData();
    form.append('subject', subject)
    form.append('channel', channelId)
    form.append('mixin_type', mixinType)

    return form
}

export const fetchRestrictMixin = (subject: string, channelId: string, mixinType: MixinTypeStates) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(subject, channelId, mixinType)

            const response = await axios.post(ApiRoutes.RestrictMixin, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data && response.data['mixin']) {
                dispatch({
                    type: MixinActionTypes.deleteMixin, payload: {
                        channelId: subject,
                        mixinId: response.data['mixin'], mixinType: mixinType
                    }
                })
            }
        } catch (error: AxiosError | any) {
            console.log(error)
        }
    }
}