import {Dispatch} from "@reduxjs/toolkit";
import {UserActionTypes} from "../store/reducers/userReducer";

import axios, {AxiosError} from "axios";
import {rootActions} from "../store/reducers";
import {PathActionTypes} from "../store/reducers/pathReducer";
import {dataStates} from "../store/reducers/consts";
import {routes} from "../routes/routes";

export const fetchLogout = () => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const response = await axios.post('/do/logout', {}, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (!response.data['auth']) {
                dispatch({type: UserActionTypes.deleteUser})
            }

            dispatch({type: PathActionTypes.setPath, payload: routes.index})
        } catch (error: AxiosError | any) {
            console.log(error.message)
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.error})
        }
    }
}