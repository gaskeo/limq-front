import {userAction, UserActionTypes} from "../store/reducers/userReducer";
import {dataStates} from "../store/reducers/consts";
import {Dispatch} from "@reduxjs/toolkit";
import axios from "axios";
import {ApiRoutes} from "./apiRoutes";

export const fetchUser = () => {
    return async (dispatch: Dispatch<userAction>) => {
        try {
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.requested})
            const response = await axios(ApiRoutes.GetUser)
            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
            }

            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.received})
        }
        catch (error) {
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.error})
        }
    }
}