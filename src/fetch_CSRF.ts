import {dataStates, LoginAction, LoginActionTypes} from "./store/reducers/loginReducer";
import {Dispatch} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCSRF = () => {
    return async (dispatch: Dispatch<LoginAction>) => {
        try {
            dispatch({type: LoginActionTypes.setCSRFState, payload: dataStates.requested})
            const response = await axios('http://localhost:5000/do/get_csrf_login')
            dispatch({type: LoginActionTypes.setCSRF, payload: response.data['csrf']})
            dispatch({type: LoginActionTypes.setCSRFState, payload: dataStates.received})
        }
        catch (error) {
            console.log(error)
            dispatch({type: LoginActionTypes.setCSRFState, payload: dataStates.error})
        }
    }
}