import {dataStates} from "./consts";
import {Channel} from "./channelsReducer";


export interface Mixin {
    in: Channel[],
    out: Channel[],
    mixinsDataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
}

export interface MixinState {
    mixinsData: {
        [channelId: string]: Mixin
    }
}

const defaultState: MixinState = {
    mixinsData: {},
}

export enum MixinActionTypes {
    setMixins = 'setMixins',
    addMixin = 'addMixin',
    deleteMixin = 'deleteMixin',
    setMixinsDataState = 'setMixinsDataState',
}


type ChannelId = string
type MixinId = string

export enum MixinTypeStates {
    in = 'in',
    out = 'out'
}
type MixinType = MixinTypeStates.in | MixinTypeStates.out

interface setMixinsAction {
    type: MixinActionTypes.setMixins,
    payload: { channelId: ChannelId, mixins: {in: Channel[], out: Channel[]} }
}

interface addMixinAction {
    type: MixinActionTypes.addMixin,
    payload: { channelId: ChannelId, mixin: Channel, mixinType: MixinType }
}


interface deleteMixinAction {
    type: MixinActionTypes.deleteMixin,
    payload: { channelId: ChannelId, mixinId: MixinId, mixinType: MixinType},
}

interface setMixinsDataAction {
    type: MixinActionTypes.setMixinsDataState,
    payload: { channelId: ChannelId,
        dataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error }
}

export type mixinAction = setMixinsAction | addMixinAction | deleteMixinAction | setMixinsDataAction

export function MixinsReducer(state = defaultState, action: mixinAction): MixinState {
    const channelId = action.payload?.channelId;
    const mixins = state.mixinsData
    let dataState, newMixins: {in: Channel[], out: Channel[]}= {in: [], out: []}
    switch (action.type) {
        case MixinActionTypes.setMixins:
            newMixins = action.payload.mixins
            dataState = mixins[channelId] ? mixins[channelId].mixinsDataState : dataStates.notRequested

            return {...state, mixinsData: {...mixins, [channelId]: {...newMixins, mixinsDataState: dataState}}}

        case MixinActionTypes.addMixin:
            dataState = mixins[channelId].mixinsDataState
            if (action.payload.mixinType === 'in') {
                newMixins.in = [...state.mixinsData[channelId].in, action.payload.mixin]
                newMixins.out = [...state.mixinsData[channelId].out]
            } else {
                newMixins.in = [...state.mixinsData[channelId].in]
                newMixins.out = [...state.mixinsData[channelId].out, action.payload.mixin]
            }

            return {...state, mixinsData: {...mixins, [channelId]: {...newMixins, mixinsDataState: dataState}}}

        case MixinActionTypes.deleteMixin:
            dataState = mixins[channelId].mixinsDataState

            if (action.payload.mixinType === 'in') {
                newMixins.in = state.mixinsData[channelId].in.filter(channel => channel.channel_id !==
                    action.payload.mixinId)
                newMixins.out = [...state.mixinsData[channelId].out]
            } else {
                newMixins.in = [...state.mixinsData[channelId].in]
                newMixins.out = state.mixinsData[channelId].out.filter(channel => channel.channel_id !==
                    action.payload.mixinId)
            }
            return {...state, mixinsData: {...mixins, [channelId]: {...newMixins, mixinsDataState: dataState}}}

        case MixinActionTypes.setMixinsDataState:
            newMixins = mixins[channelId] ? {in: mixins[channelId].in, out: mixins[channelId].out} : {in: [], out: []}
            dataState = action.payload.dataState

            return {...state, mixinsData: {...mixins, [channelId]: {...newMixins, mixinsDataState: dataState}}}

        default:
            return state
    }
}
