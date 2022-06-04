import {combineReducers} from "@reduxjs/toolkit";
import {UserReducer} from "./userReducer";

export const rootReducer = combineReducers({
    user: UserReducer
})

export type rootState = ReturnType<typeof rootReducer>
