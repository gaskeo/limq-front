import {useSearchParams} from "react-router-dom";
import {MainBlock} from "../../settings/blocks/mainBlock";
import {useTypedSelector} from "../useTypedSelector";
import {setTheme} from "../../theme";
import {useDispatch} from "react-redux";
import {availableLanguages, setLang} from "../../lang/getLang";
import {LangActionTypes} from "../../store/reducers/langReducer";
import {ThemeActionTypes} from "../../store/reducers/theme";

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
    const [searchParams] = useSearchParams()
    const tabs = menuTabs({main: ''})
    const currentTab = searchParams.get(params.tab) || ''

    return {tabs, currentTab}
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
        dispatch({type: ThemeActionTypes.setTheme, payload: newTheme})
        setTheme(newTheme)
    }

    const {lang} = useTypedSelector(state => state.lang)

    const {theme} = useTypedSelector(state => state.theme)
    const dispatch = useDispatch()

    return {lang, theme, onLangChange, onThemeChange}
}
