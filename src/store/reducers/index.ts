import {combineReducers} from "@reduxjs/toolkit";
import {LoginReducer} from "./loginReducer";

export const rootReducer = combineReducers({
    login: LoginReducer
})

export type rootState = ReturnType<typeof rootReducer>
