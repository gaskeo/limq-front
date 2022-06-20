import {useSearchParams} from "react-router-dom";
import {MainBlock} from "../../settings/blocks/mainBlock";
import {useTypedSelector} from "../useTypedSelector";
import {useState} from "react";
import {availableThemes, getTheme, setTheme} from "../../theme";
import {useDispatch} from "react-redux";
import {availableLanguages, setLang} from "../../lang/getLang";
import {LangActionTypes} from "../../store/reducers/langReducer";

export const menuTabs = (names: { main: string }) => [
    {
        name: names.main, parameterName: 'main',
        id: 1, block: () => <MainBlock key='1'/>
    },
]


const params = {
    tab: 'tab'
}

export function useSettings() {
    function checkTabInParams() {
        if (!searchParams.get(params.tab)) {
            changeTab(tabs[0].parameterName)()
        }
    }
    function changeTab(tab: string) {
        return function () {
            changeSearchParams({[params.tab]: tab})
        }
    }

    const [searchParams, changeSearchParams] = useSearchParams()
    const tabs = menuTabs({main: ''})
    const currentTab = searchParams.get(params.tab) || ''

    return {checkTabInParams, changeTab, tabs, currentTab}
}

export function useSettingsBlock() {
    function onLangChange(language: string) {
        setLang(language as availableLanguages)
        dispatch({
            type: LangActionTypes.setLang, payload: {
                lang: language,
                langCode: availableLanguages.undefined
            }
        })
    }

    function onThemeChange(newTheme: string) {
        changeTheme(newTheme as availableThemes)
        setTheme(newTheme)
    }

    const {lang} = useTypedSelector(state => state.lang)

    const [theme, changeTheme] = useState(getTheme())
    const dispatch = useDispatch()

    return {lang, theme, onLangChange, onThemeChange}
}
