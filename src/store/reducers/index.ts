import {combineReducers} from "@reduxjs/toolkit";
import {userAction, UserReducer} from "./userReducer";
import {pathAction, PathReducer} from "./pathReducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    path: PathReducer
})

export type rootActions = userAction | pathAction

export type rootState = ReturnType<typeof rootReducer>
