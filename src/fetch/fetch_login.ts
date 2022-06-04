import {Dispatch} from "@reduxjs/toolkit";
import {dataStates, userAction, UserActionTypes} from "../store/reducers/userReducer";
import axios from "axios";

function createForm(email: string, password: string, rememberMe: boolean): FormData {
    const form = new FormData();
    form.append('email', email)
    form.append('password', password)
    form.append('remember_me', String(rememberMe))
    return form
}

export const fetchLogin = (email: string, password: string, rememberMe: boolean) => {
    return async (dispatch: Dispatch<userAction>) => {
        try {
            const form = createForm(email, password, rememberMe)
            const response = await axios.post('/do/login', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })
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