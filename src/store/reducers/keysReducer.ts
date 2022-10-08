import {dataStates} from "./consts";

export interface Key {
    key: string,
    name: string,
    read: number,
    write: number,
    channel: string
    created: string,
    active: boolean,
    info: boolean
}

interface keysState {
    keysData: {
        [channelId: string]:
            {
                keys: Key[],
                keysDataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
            }
    },
}

const defaultState: keysState = {
    keysData: {},
}

export enum KeyActionTypes {
    setKeys = 'setKeys',
    addKey = 'addKey',
    deleteKey = 'deleteKey',
    setKeysDataState = 'setKeysDataState',
    replaceKey = 'replaceKey',
    deleteAllKeys = "deleteAllKeys"
}

type ChannelId = string
type KeyId = string

interface setKeysAction {
    type: KeyActionTypes.setKeys,
    payload: { channelId: ChannelId, keys: Key[] }
}

interface addKeyAction {
    type: KeyActionTypes.addKey,
    payload: { channelId: ChannelId, key: Key }
}

interface deleteKeyAction {
    type: KeyActionTypes.deleteKey,
    payload: { channelId: ChannelId, keyId: KeyId },
}

interface setKeysDataAction {
    type: KeyActionTypes.setKeysDataState,
    payload: { channelId: ChannelId, dataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error }
}

interface replaceKey {
    type: KeyActionTypes.replaceKey,
    payload: {channelId: ChannelId, key: Key}
}

interface deleteAllKeys {
    type: KeyActionTypes.deleteAllKeys
}

export type keyAction = setKeysAction | addKeyAction | deleteKeyAction | setKeysDataAction | replaceKey | deleteAllKeys

export function KeysReducer(state = defaultState, action: keyAction): keysState {
    const keys = state.keysData
    let dataState, newKeys, channelId
    switch (action.type) {
        case KeyActionTypes.setKeys:
            channelId = action.payload?.channelId;

            newKeys = action.payload.keys
            dataState = keys[channelId] ? keys[channelId].keysDataState : dataStates.notRequested

            return {...state, keysData: {...keys, [channelId]: {keys: newKeys, keysDataState: dataState}}}

        case KeyActionTypes.addKey:
            channelId = action.payload?.channelId;
            dataState = keys[channelId].keysDataState
            newKeys = [...keys[channelId].keys, action.payload.key]

            return {...state, keysData: {...keys, [channelId]: {keys: newKeys, keysDataState: dataState}}}

        case KeyActionTypes.deleteKey:
            channelId = action.payload?.channelId;
            newKeys = keys[channelId].keys.filter(key => key.key !== action.payload.keyId)
            dataState = keys[channelId].keysDataState

            return {...state, keysData: {...keys, [channelId]: {keys: newKeys, keysDataState: dataState}}}

        case KeyActionTypes.setKeysDataState:
            channelId = action.payload?.channelId;
            newKeys = keys[channelId] ? keys[channelId].keys : []
            dataState = action.payload.dataState

            return {...state, keysData: {...keys, [channelId]: {keys: newKeys, keysDataState: dataState}}}

        case KeyActionTypes.replaceKey:
            channelId = action.payload?.channelId;
            newKeys = keys[channelId].keys.map(key => key.key !== action.payload.key.key ? key : action.payload.key)
            dataState = keys[channelId].keysDataState

            return {...state, keysData: {...keys, [channelId]: {keys: newKeys, keysDataState: dataState}}}

        case KeyActionTypes.deleteAllKeys:
            return {...state, keysData: {}}
        default:
            return state
    }
}
