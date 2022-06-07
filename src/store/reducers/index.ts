import {combineReducers} from "@reduxjs/toolkit";
import {userAction, UserReducer} from "./userReducer";
import {pathAction, PathReducer} from "./pathReducer";
import {channelAction, ChannelsReducer} from "./channelsReducer";
import {keyAction, KeysReducer} from "./keysReducer";
import {mixinAction, MixinsReducer} from "./mixinsReducer";
import {fetchAction, FetchReducer} from "./fetchReducer";


export const rootReducer = combineReducers({
    user: UserReducer,
    path: PathReducer,
    channels: ChannelsReducer,
    keys: KeysReducer,
    mixins: MixinsReducer,
    fetch: FetchReducer
})

export type rootActions = userAction | pathAction | channelAction | keyAction | mixinAction | fetchAction

export type rootState = ReturnType<typeof rootReducer>
