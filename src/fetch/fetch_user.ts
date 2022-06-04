import {dataStates, userAction, UserActionTypes} from "../store/reducers/userReducer";
import {Dispatch} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = () => {
    return async (dispatch: Dispatch<userAction>) => {
        try {
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.requested})
            const response = await axios('/do/get_user')
            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
            }

            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.received})
        }
        catch (error) {
            console.log(error)
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.error})
        }
    }
}