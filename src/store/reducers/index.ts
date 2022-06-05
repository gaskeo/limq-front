import {combineReducers} from "@reduxjs/toolkit";
import {userAction, UserReducer} from "./userReducer";
import {pathAction, PathReducer} from "./pathReducer";
import {channelAction, ChannelsReducer} from "./channelsReducer";


export const rootReducer = combineReducers({
    user: UserReducer,
    path: PathReducer,
    channels: ChannelsReducer
})

export type rootActions = userAction | pathAction | channelAction

export type rootState = ReturnType<typeof rootReducer>
