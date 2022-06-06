import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {UserActionTypes} from "../store/reducers/userReducer";

function createForm(oldPassword: string, password: string): FormData {
    const form = new FormData();
    form.append('old_password', oldPassword)
    form.append('password', password)
    return form
}

export const fetchChangePassword = (oldPassword: string, password: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(oldPassword, password)

            const response = await axios.post('/do/change_password', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
            }
        }
        catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}