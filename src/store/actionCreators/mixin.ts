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
        dispatch({
            type: MixinActionTypes.setMixinsDataState, payload: {
                channelId: channelId,
                dataState: dataStates.requested
            }
        })

        axios.get<Mixin>(ApiRoutes.GetMixins, {params: {'channel_id': channelId}}).then(response => {
            if (response.data) {
                dispatch({type: MixinActionTypes.setMixins, payload: {channelId: channelId, mixins: response.data}})
                dispatch({
                    type: MixinActionTypes.setMixinsDataState, payload: {
                        channelId: channelId,
                        dataState: dataStates.received
                    }
                })
            }
        }).catch(() => {
        })
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
        const form = createCreateMixinForm(channelId, keyId)
        dispatch({
            type: FetchActionTypes.setFetch,
            payload: {
                identifier: ApiRoutes.CreateMixin,
                state: {status: 200, code: '', dataState: dataStates.requested}
            }
        })

        axios.post<{ mixin: Channel }>(ApiRoutes.CreateMixin, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
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
        }).catch((error: AxiosError) => {
            const data = error.response?.data as ({ code: number } | undefined)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.CreateMixin, state: {
                        status: Number(error.status) | 0, code: String(data?.code || 0),
                        dataState: dataStates.error
                    }
                }
            })
        })
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
        const form = createRestrictMixinForm(subject, channelId, mixinType)

        axios.post<{ mixin: string }>(ApiRoutes.RestrictMixin, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            if (response.data && response.data['mixin']) {
                dispatch({
                    type: MixinActionTypes.deleteMixin, payload: {
                        channelId: subject,
                        mixinId: response.data['mixin'], mixinType: mixinType
                    }
                })
            }
        }).catch(() => {})
    }
}
