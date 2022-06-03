interface loginState {
    csrf: string,
    csrfState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
}

export enum dataStates  {
    notRequested = 0,
    requested = 1,
    received = 2,
    error = 3
}

const defaultState = {
    csrf: '',
    csrfState: dataStates.notRequested
}

export enum LoginActionTypes {
    setCSRF = 'setCSRF',
    setCSRFState = 'setCSRFState'
}

interface setCSRFAction {
    type: LoginActionTypes.setCSRF,
    payload: string
}

interface setCSRFActionState {
    type: LoginActionTypes.setCSRFState,
    payload: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
}

export type LoginAction = setCSRFAction | setCSRFActionState

export function LoginReducer(state: loginState = defaultState, action: LoginAction):loginState {
    switch (action.type) {
        case LoginActionTypes.setCSRF:
            return {...state, csrf: action.payload}
        case LoginActionTypes.setCSRFState:
            return {...state, csrfState: action.payload}
        default:
            return state
    }
}
