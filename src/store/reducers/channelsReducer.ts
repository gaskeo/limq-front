import {dataStates} from "./consts";

interface keyTypesCount {
    active: number,
    inactive: number
}

export interface Channel {
    channel_id: string,
    channel_name: string,
    read_keys: keyTypesCount,
    write_keys: keyTypesCount
}

interface channelsState {
    channels: Channel[],
    channelsDataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
}

const defaultState: channelsState = {
    channels: [],
    channelsDataState: dataStates.notRequested
}

export enum ChannelsActionTypes {
    setChannels = 'setChannels',
    addChannel = 'addChannel',
    deleteChannel = 'deleteChannel',
    setChannelsDataState = 'setChannelsDataState'
}

interface setChannelsAction {
    type: ChannelsActionTypes.setChannels,
    payload: Channel[]
}

interface addChannelAction {
    type: ChannelsActionTypes.addChannel,
    payload: Channel
}

type ChannelId = string

interface deleteChannelAction {
    type: ChannelsActionTypes.deleteChannel,
    payload: ChannelId,
}

interface setChannelsDataAction {
    type: ChannelsActionTypes.setChannelsDataState,
    payload: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
}

export type channelAction = setChannelsAction | deleteChannelAction | setChannelsDataAction | addChannelAction

export function ChannelsReducer(state = defaultState, action: channelAction): channelsState {
    switch (action.type) {
        case ChannelsActionTypes.setChannels:
            return {...state, channels: action.payload}
        case ChannelsActionTypes.addChannel:
            return {...state, channels: state.channels.concat([action.payload])}
        case ChannelsActionTypes.deleteChannel:
            return {...state, channels: state.channels.filter(channel => channel.channel_id !== action.payload)}
        case ChannelsActionTypes.setChannelsDataState:
            return {...state, channelsDataState: action.payload}
        default:
            return state
    }
}