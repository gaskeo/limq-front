import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {KeyActionTypes} from "../store/reducers/keysReducer";

function createForm(keyId: string): FormData {
    const form = new FormData();
    form.append('key', keyId)
    return form
}

export const fetchDeleteKey = (channelId: string, keyId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(keyId)

            const response = await axios.post('/do/toggle_key_active', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data && response.data['key'] === keyId) {
                dispatch({type: KeyActionTypes.deleteKey,
                    payload: {channelId: channelId, keyId: response.data['key']}})
            }

        }
        catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}