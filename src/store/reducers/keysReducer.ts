import {dataStates} from "./consts";

export interface key {
    key: string,
    name: string,
    perm: 1 | 2,
    created: string
}

interface keysState {
    keys: {
        [channelId: string]:
            {
                keys: key[],
                keysDataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
            }
    },
}

const defaultState: keysState = {
    keys: {},
}

export enum KeyActionTypes {
    setKeys = 'setKeys',
    addKey = 'addKey',
    deleteKey = 'deleteKey',
    setKeysDataState = 'setKeysDataState'
}

type ChannelId = string
type KeyId = string

interface setKeysAction {
    type: KeyActionTypes.setKeys,
    payload: { channelId: ChannelId, keys: key[] }
}

interface addKeyAction {
    type: KeyActionTypes.addKey,
    payload: { channelId: ChannelId, key: key }
}

interface deleteKeyAction {
    type: KeyActionTypes.deleteKey,
    payload: { channelId: ChannelId, keyId: KeyId },
}

interface setKeysDataAction {
    type: KeyActionTypes.setKeysDataState,
    payload: { channelId: ChannelId, dataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error }
}

export type keyAction = setKeysAction | addKeyAction | deleteKeyAction | setKeysDataAction

export function KeysReducer(state = defaultState, action: keyAction): keysState {
    const channelId = action.payload?.channelId;
    const keys = state.keys
    let dataState, newKeys
    switch (action.type) {
        case KeyActionTypes.setKeys:
            newKeys = action.payload.keys
            dataState = keys[channelId] ? keys[channelId].keysDataState : dataStates.notRequested

            return {...state, keys: {...keys, [channelId]: {keys: newKeys, keysDataState: dataState}}}

        case KeyActionTypes.addKey:
            dataState = keys[channelId].keysDataState
            newKeys = [...keys[channelId].keys, action.payload.key]

            return {...state, keys: {...keys, [channelId]: {keys: newKeys, keysDataState: dataState}}}

        case KeyActionTypes.deleteKey:
            newKeys = keys[channelId].keys.filter(key => key.key !== action.payload.keyId)
            dataState = keys[channelId].keysDataState

            return {...state, keys: {...keys, [channelId]: {keys: newKeys, keysDataState: dataState}}}

        case KeyActionTypes.setKeysDataState:
            newKeys = keys[channelId] ? keys[channelId].keys : []
            dataState = action.payload.dataState

            return {...state, keys: {...keys, [channelId]: {keys: newKeys, keysDataState: dataState}}}

        default:
            return state
    }
}