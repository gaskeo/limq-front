import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {UserActionTypes} from "../store/reducers/userReducer";
import {FetchActionTypes} from "../store/reducers/fetchReducer";
import {dataStates} from "../store/reducers/consts";

function createForm(newEmail: string, password: string): FormData {
    const form = new FormData();
    form.append('new_email', newEmail)
    form.append('password', password)
    return form
}

export const fetchChangeEmail = (newEmail: string, password: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(newEmail, password)

            dispatch({type: FetchActionTypes.setFetch,
                payload: {identifier: 'changeEmail', state: {status: 200, message: '', dataState: dataStates.requested}}})
            const response = await axios.post('/do/change_email', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({type: FetchActionTypes.setFetch,
                    payload: {identifier: 'changeEmail', state: {status: 200, message: '', dataState: dataStates.received}}})
            }
        }
        catch (error: AxiosError | any) {
            dispatch({type: FetchActionTypes.setFetch,
                payload: {identifier: 'changeEmail', state: {status: error.status, message:
                        error.response.data.message, dataState: dataStates.received}}})
        }
    }
}