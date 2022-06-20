import React from "react";
import {Select} from "../../elements/inputs/select";
import {availableLanguages, getLang} from "../../lang/getLang";
import {availableThemes} from "../../theme";
import {useSettingsBlock} from "../../hooks/elementHooks/useSettings";


export function MainBlock() {
    const {lang, onThemeChange, onLangChange, theme} = useSettingsBlock()

    const {
        MainSettings,
        English,
        Russian,
        ChangeLanguage,
        DarkTheme,
        LightTheme,
        SystemTheme,
        ChangeTheme
    } = lang

    return (
        <div>
            <h1 className='header-1'>{MainSettings}</h1>
            <Select id='lang' items={[{text: English, value: availableLanguages.en},
                {text: Russian, value: availableLanguages.ru}]} onChange={onLangChange} label={ChangeLanguage}
                    selected={getLang()}/>
            <div className='gap'/>
            <Select id='theme' items={[
                {text: DarkTheme, value: availableThemes.dark},
                {text: LightTheme, value: availableThemes.light},
                {text: SystemTheme, value: availableThemes.system}]}
                    onChange={onThemeChange} label={ChangeTheme} selected={theme}/>
        </div>
    )
}