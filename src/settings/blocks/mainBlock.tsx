import React, {useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Select} from "../../elements/inputs/select";
import {useDispatch} from "react-redux";
import {availableLanguages, getLang, setLang} from "../../lang/getLang";
import {LangActionTypes} from "../../store/reducers/langReducer";
import {availableThemes, getTheme, setTheme} from "../../theme";


interface mainBlockProps {
    isCurrent: boolean
}

export function MainBlock({isCurrent}: mainBlockProps) {
    const {lang} = useTypedSelector(state => state.lang)

    const [theme, changeTheme] = useState('')

    const dispatch = useDispatch()

    function onLangChange(language: string) {
        setLang(language as availableLanguages)
        dispatch({type: LangActionTypes.setLang, payload: {lang: language,
                langCode: availableLanguages.undefined}})
        }

    function onThemeChange(newTheme: string) {
        changeTheme(newTheme)
        setTheme(newTheme)
    }

    if (!isCurrent) {
        return null
    }

    return (
        <div>
            <h1 className='header-1'>{lang.MainSettings}</h1>
            <Select id='lang' items={[{text: lang.English, value: availableLanguages.en},
                {text: lang.Russian, value: availableLanguages.ru}]} onChange={onLangChange} label={lang.ChangeLanguage} selected={getLang()}/>
            <div className='gap'/>
            <Select id='theme' items={[{text: lang.DarkTheme, value: availableThemes.dark},
                {text: lang.LightTheme, value: availableThemes.light},
                {text: lang.SystemTheme, value: availableThemes.system}]}
                    onChange={onThemeChange} label={lang.ChangeTheme} selected={getTheme()}/>
        </div>
    )
}