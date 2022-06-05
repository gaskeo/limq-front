import {Dispatch} from "@reduxjs/toolkit";
import {UserActionTypes} from "../store/reducers/userReducer";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {PathActionTypes} from "../store/reducers/pathReducer";
import {dataStates} from "../store/reducers/consts";

function createForm(email: string, password: string, rememberMe: boolean): FormData {
    const form = new FormData();
    form.append('email', email)
    form.append('password', password)
    form.append('remember_me', String(rememberMe))
    return form
}

export const fetchLogin = (email: string, password: string, rememberMe: boolean) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(email, password, rememberMe)

            const response = await axios.post('/do/login', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
            }

            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.received})
            dispatch({type: PathActionTypes.setPath, payload: response.data['path']})
        }
        catch (error: AxiosError | any) {
            console.log(error.message)
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.error})
        }
    }
}