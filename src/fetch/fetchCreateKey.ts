import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {KeyActionTypes} from "../store/reducers/keysReducer";

function createForm(name: string, permission: string, channelId: string): FormData {
    const form = new FormData();
    form.append('name', name)
    form.append('id', channelId)
    form.append('permissions', permission)

    return form
}

export const fetchCreateKey = (keyName: string, permission: string, channelId: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createForm(keyName, permission, channelId)

            const response = await axios.post('/do/grant', form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data) {
                dispatch({type: KeyActionTypes.addKey, payload: {channelId: channelId, key: response.data}})
            }
        }
        catch (error: AxiosError | any) {
            console.log(error.message)
        }
    }
}