import {combineReducers} from "@reduxjs/toolkit";
import {userAction, UserReducer} from "./userReducer";
import {pathAction, PathReducer} from "./pathReducer";
import {channelAction, ChannelsReducer} from "./channelsReducer";
import {keyAction, KeysReducer} from "./keysReducer";
import {mixinAction, MixinsReducer} from "./mixinsReducer";


export const rootReducer = combineReducers({
    user: UserReducer,
    path: PathReducer,
    channels: ChannelsReducer,
    keys: KeysReducer,
    mixins: MixinsReducer
})

export type rootActions = userAction | pathAction | channelAction | keyAction | mixinAction

export type rootState = ReturnType<typeof rootReducer>
