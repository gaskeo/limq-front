import {combineReducers} from "@reduxjs/toolkit";
import {userAction, UserReducer} from "./userReducer";
import {pathAction, PathReducer} from "./pathReducer";
import {channelAction, ChannelsReducer} from "./channelsReducer";
import {keyAction, KeysReducer} from "./keysReducer";


export const rootReducer = combineReducers({
    user: UserReducer,
    path: PathReducer,
    channels: ChannelsReducer,
    keys: KeysReducer
})

export type rootActions = userAction | pathAction | channelAction | keyAction

export type rootState = ReturnType<typeof rootReducer>
