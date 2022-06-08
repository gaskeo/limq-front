import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {KeyActionTypes} from "../store/reducers/keysReducer";
import {ApiRoutes} from "./apiRoutes";

function createForm(keyId: string): FormData {
    const form = new FormData();
    form.append('key', keyId)
    return form
}

export const fetchDeleteKey = (channelId: string, keyId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(keyId)

            const response = await axios.post(ApiRoutes.DeleteKey, form, {
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