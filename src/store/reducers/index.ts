import {combineReducers} from "@reduxjs/toolkit";
import {userAction, UserReducer} from "./userReducer";
import {pathAction, PathReducer} from "./pathReducer";
import {channelAction, ChannelsReducer} from "./channelsReducer";
import {keyAction, KeysReducer} from "./keysReducer";
import {mixinAction, MixinsReducer} from "./mixinsReducer";
import {fetchAction, FetchReducer} from "./fetchReducer";
import {langAction, LangReducer} from "./langReducer";
import {themeAction, ThemeReducer} from "./theme";


export const rootReducer = combineReducers({
    user: UserReducer,
    path: PathReducer,
    channels: ChannelsReducer,
    keys: KeysReducer,
    mixins: MixinsReducer,
    fetch: FetchReducer,
    lang: LangReducer,
    theme: ThemeReducer
})

export type rootActions = userAction | pathAction | channelAction | keyAction | mixinAction | fetchAction | langAction | themeAction

export type rootState = ReturnType<typeof rootReducer>
