import {Dispatch} from "@reduxjs/toolkit";
import {PathActionTypes} from "../store/reducers/pathReducer";
import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";

function createForm(email: string, password: string, passwordAgain: string): FormData {
    const form = new FormData();
    form.append('email', email)
    form.append('username', email)
    form.append('password', password)
    form.append('password_again', passwordAgain)
    return form
}

export const fetchRegister = (email: string, username: string, password: string, passwordAgain: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(email, password, passwordAgain)

            const response = await axios.post('/do/register', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['status']) {
                dispatch({type: PathActionTypes.deletePath})
                dispatch({type: PathActionTypes.setPath, payload: response.data['path']})
            }
        }
        catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}