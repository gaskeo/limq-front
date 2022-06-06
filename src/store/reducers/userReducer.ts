import {dataStates} from "./consts";

interface userState {
    id: number | null,
    username: string | null,
    email: string | null,
    userDataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
}

const defaultState: userState = {
    id: 0,
    email: null,
    username: null,
    userDataState: dataStates.notRequested
}

export enum UserActionTypes {
    setUser = 'setUser',
    setUserDataState = 'setUserDataState'
}

interface setUserAction {
    type: UserActionTypes.setUser,
    payload: {id: number, username: string, email: string}
}

interface setUserDataAction {
    type: UserActionTypes.setUserDataState,
    payload: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
}

export type userAction = setUserAction | setUserDataAction

export function UserReducer(state: userState = defaultState, action: userAction):userState {
    switch (action.type) {
        case UserActionTypes.setUser:
            return {...state, id: action.payload.id, username: action.payload.username, email: action.payload.email}
        case UserActionTypes.setUserDataState:
            return {...state, userDataState: action.payload}
        default:
            return state
    }
}
