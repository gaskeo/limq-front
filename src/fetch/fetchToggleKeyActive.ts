import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {KeyActionTypes} from "../store/reducers/keysReducer";

function createForm(keyId: string): FormData {
    const form = new FormData();
    form.append('key', keyId)
    return form
}

export const fetchToggleKeyActive = (channelId: string, keyId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(keyId)

            const response = await axios.post('/do/delete_key', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data) {
                dispatch({type: KeyActionTypes.replaceKey, payload: {channelId: channelId, key: response.data}})
            }
        }
        catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}