import {Dispatch} from "@reduxjs/toolkit";
import {rootActions} from "../reducers";
import {MixinActionTypes, Mixin, MixinTypeStates} from "../reducers/mixinsReducer";
import {dataStates} from "../reducers/consts";
import axios, {AxiosError} from "axios";
import {ApiRoutes} from "./apiRoutes";
import {FetchActionTypes} from "../reducers/fetchReducer";
import {Channel} from "../reducers/channelsReducer";

export const fetchGetMixins = (channelId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {

            dispatch({
                type: MixinActionTypes.setMixinsDataState, payload: {
                    channelId: channelId,
                    dataState: dataStates.requested
                }
            })

            const response = await axios.get<Mixin>(ApiRoutes.GetMixins, {params: {'channel_id': channelId}})

            if (response.data) {
                dispatch({type: MixinActionTypes.setMixins, payload: {channelId: channelId, mixins: response.data}})
                dispatch({
                    type: MixinActionTypes.setMixinsDataState, payload: {
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


function createCreateMixinForm(channelId: string, keyId: string): FormData {
    const form = new FormData();
    form.append('channel', channelId)
    form.append('key', keyId)

    return form
}

export const fetchCreateMixin = (channelId: string, keyId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createCreateMixinForm(channelId, keyId)
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.CreateMixin,
                    state: {status: 200, code: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.post<{ mixin: Channel }>(ApiRoutes.CreateMixin, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data && response.data['mixin']) {
                dispatch({
                    type: MixinActionTypes.addMixin, payload: {
                        channelId: channelId,
                        mixin: response.data['mixin'], mixinType: MixinTypeStates.in
                    }
                })

                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.CreateMixin,
                        state: {status: 200, code: '', dataState: dataStates.received}
                    }
                })
            }
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.CreateMixin, state: {
                        status: error.status, code: String(error.response.data.code),
                        dataState: dataStates.error
                    }
                }
            })
        }
    }
}


function createRestrictMixinForm(subject: string, channelId: string, mixinType: MixinTypeStates): FormData {
    const form = new FormData();
    form.append('subject', subject)
    form.append('channel', channelId)
    form.append('mixin_type', mixinType)

    return form
}

export const fetchRestrictMixin = (subject: string, channelId: string, mixinType: MixinTypeStates) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createRestrictMixinForm(subject, channelId, mixinType)

            const response = await axios.post<{ mixin: string }>(ApiRoutes.RestrictMixin, form, {
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