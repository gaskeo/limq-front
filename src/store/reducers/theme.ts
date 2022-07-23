import {availableThemes} from "../../theme";

interface themeState {
    theme: availableThemes
}

const defaultState: themeState = {
    theme: availableThemes.system,
}


export enum ThemeActionTypes {
    setTheme = 'setTheme',
}

interface setThemeAction {
    type: ThemeActionTypes.setTheme,
    payload: availableThemes
}

export type themeAction = setThemeAction

export function ThemeReducer(state = defaultState, action: themeAction):themeState {
    switch (action.type) {
        case ThemeActionTypes.setTheme:
            return {...state, theme: action.payload}
        default:
            return state
    }
}
