import {dataStates} from "./consts";

export interface User {
    id: number | null,
    username: string | null,
    email: string | null,
}

interface userState {
    user: User,
    userDataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error

}

const defaultState: userState = {
    user: {id: 0, email: '', username: ''},
    userDataState: dataStates.notRequested
}

export enum UserActionTypes {
    setUser = 'setUser',
    setUserDataState = 'setUserDataState',
    deleteUser = 'deleteUser'
}

interface setUserAction {
    type: UserActionTypes.setUser,
    payload: User
}

interface setUserDataAction {
    type: UserActionTypes.setUserDataState,
    payload: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
}

interface deleteUser {
    type: UserActionTypes.deleteUser
}

export type userAction = setUserAction | setUserDataAction | deleteUser

export function UserReducer(state: userState = defaultState, action: userAction):userState {
    switch (action.type) {
        case UserActionTypes.setUser:
            return {...state, user: action.payload}
        case UserActionTypes.setUserDataState:
            return {...state, userDataState: action.payload}
        case UserActionTypes.deleteUser:
            return {...state, ...defaultState}
        default:
            return state
    }
}
