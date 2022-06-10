import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../reducers";
import {userAction, UserActionTypes} from "../reducers/userReducer";
import {FetchActionTypes} from "../reducers/fetchReducer";
import {dataStates} from "../reducers/consts";
import {ApiRoutes} from "./apiRoutes";
import {PathActionTypes} from "../reducers/pathReducer";
import {routes} from "../../routes/routes";

export const fetchUser = () => {
    return async (dispatch: Dispatch<userAction>) => {
        try {
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.requested})
            const response = await axios(ApiRoutes.GetUser)
            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
            }

            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.received})
        }
        catch (error) {
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.error})
        }
    }
}


function createLoginForm(email: string, password: string, rememberMe: boolean): FormData {
    const form = new FormData();
    form.append('email', email)
    form.append('password', password)
    form.append('remember_me', String(rememberMe))
    return form
}

export const fetchLogin = (email: string, password: string, rememberMe: boolean) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createLoginForm(email, password, rememberMe)
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Login,
                    state: {status: 200, message: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.post(ApiRoutes.Login, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
            }

            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.received})

            dispatch({type: PathActionTypes.deletePath})
            dispatch({type: PathActionTypes.setPath, payload: response.data['path']})
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Login,
                    state: {status: 200, message: '', dataState: dataStates.received}
                }
            })
        } catch (error: AxiosError | any) {
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.notRequested})
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Login, state: {
                        status: error.status, message: error.response.data.message,
                        dataState: dataStates.error
                    }
                }
            })
        }
    }
}


function createRegisterForm(email: string, username: string, password: string): FormData {
    const form = new FormData();
    form.append('email', email)
    form.append('username', username)
    form.append('password', password)
    return form
}

export const fetchRegister = (email: string, username: string, password: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createRegisterForm(email, username, password)
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Register,
                    state: {status: 0, message: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.post(ApiRoutes.Register, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['status']) {
                dispatch({type: PathActionTypes.deletePath})
                dispatch({type: PathActionTypes.setPath, payload: response.data['path']})
            }
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Register, state: {
                        status: error.status, message: error.response.data.message,
                        dataState: dataStates.error
                    }
                }
            })
        }
    }
}


function createRenameUserForm(newUsername: string): FormData {
    const form = new FormData();
    form.append('new_username', newUsername)
    return form
}

export const fetchRenameUser = (newUsername: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createRenameUserForm(newUsername)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.RenameUser,
                    state: {status: 200, message: '', dataState: dataStates.requested}
                }
            })
            const response = await axios.put(ApiRoutes.RenameUser, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.RenameUser,
                        state: {status: 200, message: '', dataState: dataStates.received}
                    }
                })
            }
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.RenameUser, state: {
                        status: error.status, message:
                        error.response.data.message, dataState: dataStates.received
                    }
                }
            })
        }
    }
}


function createChangeEmailForm(newEmail: string, password: string): FormData {
    const form = new FormData();
    form.append('new_email', newEmail)
    form.append('password', password)
    return form
}

export const changeEmail = (newEmail: string, password: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createChangeEmailForm(newEmail, password)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ChangeEmail,
                    state: {status: 200, message: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.put(ApiRoutes.ChangeEmail, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.ChangeEmail,
                        state: {status: 200, message: '', dataState: dataStates.received}
                    }
                })
            }
        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ChangeEmail, state: {
                        status: error.status, message:
                        error.response.data.message, dataState: dataStates.received
                    }
                }
            })
        }
    }
}


function createChangePasswordForm(oldPassword: string, password: string): FormData {
    const form = new FormData();
    form.append('old_password', oldPassword)
    form.append('password', password)
    return form
}

export const fetchChangePassword = (oldPassword: string, password: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const form = createChangePasswordForm(oldPassword, password)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ChangePassword,
                    state: {status: 200, message: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.put(ApiRoutes.ChangePassword, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.ChangePassword,
                        state: {status: 200, message: '', dataState: dataStates.received}
                    }
                })
            }

        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ChangePassword, state: {
                        status: error.status, message:
                        error.response.data.message, dataState: dataStates.received
                    }
                }
            })
        }
    }
}


export const fetchLogout = () => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const response = await axios.post(ApiRoutes.Logout, {}, {
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