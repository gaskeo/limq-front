import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {UserActionTypes} from "../store/reducers/userReducer";
import {FetchActionTypes} from "../store/reducers/fetchReducer";
import {dataStates} from "../store/reducers/consts";

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

            dispatch({type: FetchActionTypes.setFetch,
                payload: {identifier: 'changePassword', state: {status: 200, message: '', dataState: dataStates.requested}}})

            const response = await axios.post('/do/change_password', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({type: FetchActionTypes.setFetch,
                    payload: {identifier: 'changePassword', state: {status: 200, message: '', dataState: dataStates.received}}})
            }
        }
        catch (error: AxiosError | any) {
            dispatch({type: FetchActionTypes.setFetch,
                payload: {identifier: 'changePassword', state: {status: error.status, message:
                        error.response.data.message, dataState: dataStates.received}}})
        }
    }
}
