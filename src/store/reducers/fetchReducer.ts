import {dataStates} from "./consts";

interface state {
    status: number,
    code: string,
    dataState: dataStates.notRequested | dataStates.requested | dataStates.received | dataStates.error
}

interface fetchState {
    states: {[identifier: string]: state},
}

const defaultState: fetchState = {
    states: {},
}

export enum FetchActionTypes {
    setFetch = 'setFetch',
    deleteFetches = 'deleteFetches'
}

interface setFetchAction {
    type: FetchActionTypes.setFetch,
    payload: {identifier: string, state: state}
}

interface deleteFetchesAction {
    type: FetchActionTypes.deleteFetches
}


export type fetchAction = setFetchAction | deleteFetchesAction

export function FetchReducer(state = defaultState, action: fetchAction): fetchState {
    switch (action.type) {
        case FetchActionTypes.setFetch:
            return {...state, states: {...state.states, [action.payload.identifier]: action.payload.state}}
        case FetchActionTypes.deleteFetches:
            return {...state, states: {}}
        default:
            return state
    }
}
