import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {UserActionTypes} from "../store/reducers/userReducer";

function createForm(newUsername: string): FormData {
    const form = new FormData();
    form.append('new_username', newUsername)
    return form
}

export const fetchChangeUsername = (newUsername: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(newUsername)

            const response = await axios.post('/do/change_username', form, {
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