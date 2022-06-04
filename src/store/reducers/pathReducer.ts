interface pathState {
    path: null | string
}

const defaultState: pathState = {
    path: null
}


export enum PathActionTypes {
    setPath = 'setPath',
    deletePath = 'deletePath'
}

interface setPathAction {
    type: PathActionTypes.setPath,
    payload: string
}

interface deletePathAction {
    type: PathActionTypes.deletePath
}

export type pathAction = setPathAction | deletePathAction

export function PathReducer(state = defaultState, action: pathAction):pathState {
    switch (action.type) {
        case PathActionTypes.setPath:
            return {...state, path: action.payload}
        case PathActionTypes.deletePath:
            return {...state, path: null}
        default:
            return state
    }
}