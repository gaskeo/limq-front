import {Dispatch} from "@reduxjs/toolkit";

import axios, {AxiosError} from "axios";
import {rootActions} from "../reducers";
import {User, userAction, UserActionTypes} from "../reducers/userReducer";
import {FetchActionTypes} from "../reducers/fetchReducer";
import {dataStates} from "../reducers/consts";
import {ApiRoutes} from "./apiRoutes";
import {PathActionTypes} from "../reducers/pathReducer";
import {routes} from "../../routes/routes";
import {Quota, quotaAction, QuotaActionTypes} from "../reducers/quotaReducer";
import {ChannelsActionTypes} from "../reducers/channelsReducer";
import {KeyActionTypes} from "../reducers/keysReducer";
import {MixinActionTypes} from "../reducers/mixinsReducer";

export const fetchUser = () => {
    return async (dispatch: Dispatch<userAction | quotaAction>) => {
        dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.requested})
        axios.get<{ auth: boolean, user: User, path: string, quota: Quota }>(ApiRoutes.GetUser).then(response => {
            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({type: QuotaActionTypes.setQuota, payload: response.data['quota']})
            } else {
                dispatch({type: UserActionTypes.setUser, payload: {id: '', email: '', username: ''}})
            }

            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.received})
            dispatch({type: QuotaActionTypes.setQuotaDataState, payload: dataStates.received})

        }).catch(() => {
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.error})
        })
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
        const form = createLoginForm(email, password, rememberMe)
        dispatch({
            type: FetchActionTypes.setFetch,
            payload: {
                identifier: ApiRoutes.Login,
                state: {status: 200, code: '', dataState: dataStates.requested}
            }
        })

        axios.post<{ auth: boolean, user: User, path: string, quota: Quota }>(ApiRoutes.Login, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({type: QuotaActionTypes.setQuota, payload: response.data['quota']})
            } else {
                dispatch({type: UserActionTypes.setUser, payload: {id: '', email: '', username: ''}})
            }

            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.received})
            dispatch({type: QuotaActionTypes.setQuotaDataState, payload: dataStates.received})

            dispatch({type: PathActionTypes.deletePath})
            dispatch({type: PathActionTypes.setPath, payload: response.data['path']})
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Login,
                    state: {status: 200, code: '', dataState: dataStates.received}
                }
            })
        }).catch((error: AxiosError | any) => {
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.notRequested})
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Login, state: {
                        status: error.status, code: String(error.response.data.code),
                        dataState: dataStates.error
                    }
                }
            })
        })
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
        const form = createRegisterForm(email, username, password)
        dispatch({
            type: FetchActionTypes.setFetch,
            payload: {
                identifier: ApiRoutes.Register,
                state: {status: 0, code: '', dataState: dataStates.requested}
            }
        })

        await axios.post<{ status: boolean, path: string }>(ApiRoutes.Register, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            if (response.data['status']) {
                dispatch({type: PathActionTypes.deletePath})
                dispatch({type: PathActionTypes.setPath, payload: response.data['path']})
            }
        }).catch((error: AxiosError) => {
            const data = error.response?.data as ({ code: number } | undefined)
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.Register, state: {
                        status: Number(error.status) || 0, code: String(data?.code || 0),
                        dataState: dataStates.error
                    }
                }
            })
        })
    }
}


function createRenameUserForm(newUsername: string): FormData {
    const form = new FormData();
    form.append('new_username', newUsername)
    return form
}

export const fetchRenameUser = (newUsername: string) => {
    return async (dispatch: Dispatch<rootActions>) => {
        const form = createRenameUserForm(newUsername)

        dispatch({
            type: FetchActionTypes.setFetch,
            payload: {
                identifier: ApiRoutes.RenameUser,
                state: {status: 200, code: '', dataState: dataStates.requested}
            }
        })
        axios.put<{ auth: boolean, user: User, path: string }>(ApiRoutes.RenameUser, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.RenameUser,
                        state: {status: 200, code: '', dataState: dataStates.received}
                    }
                })
            }
        }).catch((error: AxiosError) => {
            const data = error.response?.data as ({ code: number } | undefined)

            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.RenameUser, state: {
                        status: Number(error.status) || 0, code:
                            String(data?.code || 0), dataState: dataStates.received
                    }
                }
            })
        })
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
        const form = createChangeEmailForm(newEmail, password)

        dispatch({
            type: FetchActionTypes.setFetch,
            payload: {
                identifier: ApiRoutes.ChangeEmail,
                state: {status: 200, code: '', dataState: dataStates.requested}
            }
        })

        axios.put<{ auth: boolean, user: User, path: string }>(ApiRoutes.ChangeEmail, form, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(response => {
            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.ChangeEmail,
                        state: {status: 200, code: '', dataState: dataStates.received}
                    }
                })
            }
        }).catch((error: AxiosError) => {
            const data = error.response?.data as ({ code: number } | undefined)
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ChangeEmail, state: {
                        status: Number(error.status) || 0, code:
                            String(data?.code || 0), dataState: dataStates.received
                    }
                }
            })
        })
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
                    state: {status: 200, code: '', dataState: dataStates.requested}
                }
            })

            const response = await axios.put<{ auth: boolean, user: User, path: string }>
            (ApiRoutes.ChangePassword, form, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (response.data['auth']) {
                dispatch({type: UserActionTypes.setUser, payload: response.data['user']})
                dispatch({
                    type: FetchActionTypes.setFetch,
                    payload: {
                        identifier: ApiRoutes.ChangePassword,
                        state: {status: 200, code: '', dataState: dataStates.received}
                    }
                })
            }

        } catch (error: AxiosError | any) {
            dispatch({
                type: FetchActionTypes.setFetch,
                payload: {
                    identifier: ApiRoutes.ChangePassword, state: {
                        status: error.status, code:
                        error.response.data.code, dataState: dataStates.received
                    }
                }
            })
        }
    }
}


export const fetchLogout = () => {
    return async (dispatch: Dispatch<rootActions>) => {
        try {
            const response = await axios.post<{ auth: boolean }>(ApiRoutes.Logout, {}, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (!response.data['auth']) {
                dispatch({type: UserActionTypes.deleteUser})
                dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.notRequested})
                dispatch({type: ChannelsActionTypes.setChannels, payload: []})
                dispatch({type: ChannelsActionTypes.setChannelsDataState, payload: dataStates.notRequested})
                dispatch({type: QuotaActionTypes.deleteQuota})
                dispatch({type: QuotaActionTypes.setQuotaDataState, payload: dataStates.notRequested})
                dispatch({type: KeyActionTypes.deleteAllKeys})
                dispatch({type: MixinActionTypes.deleteAllMixins})

            }

            dispatch({type: PathActionTypes.setPath, payload: routes.index})
            dispatch({type: PathActionTypes.deletePath})
        } catch (error: AxiosError | any) {
            console.log(error.message)
            dispatch({type: UserActionTypes.setUserDataState, payload: dataStates.error})
        }
    }
}
