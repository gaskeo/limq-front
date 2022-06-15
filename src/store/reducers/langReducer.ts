import {defaultLangValue, LangStruct} from "../../lang/langStruct";
import {availableLanguages, availableLanguagesType} from "../../lang/getLang";

interface Lang {
    lang: LangStruct
    langCode: availableLanguagesType
}

const defaultState: Lang = {
    lang: defaultLangValue,
    langCode: availableLanguages.undefined
}

export enum LangActionTypes {
    setLang = 'setLang'
}

export interface setLangAction {
    type: LangActionTypes.setLang
    payload: Lang
}

export type langAction = setLangAction

export function LangReducer(state = defaultState, action: langAction): Lang {
    switch (action.type) {
        case LangActionTypes.setLang:
            return {...state, lang: action.payload.lang, langCode: action.payload.langCode}
        default:
            return {...state}
    }
}