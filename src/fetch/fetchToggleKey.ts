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

export const fetchToggleKey = (channelId: string, keyId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(keyId)

            const response = await axios.put(ApiRoutes.ToggleKey, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data) {
                dispatch({type: KeyActionTypes.replaceKey, payload: {channelId: channelId, key: response.data}})
            }
        } catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}