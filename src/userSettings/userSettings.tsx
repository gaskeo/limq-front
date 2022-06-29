import {useEffect} from "react";
import {Menu} from "../elements/menu/menu";
import {SettingsBlock} from "../elements/menu/settingsBlock";
import {useUserSettings} from "../hooks/elementHooks/useUserSettings";

export function UserSettings() {
    const {lang, checkTabInParams, changeTab, tabs, currentTab} = useUserSettings()

    const {UserSettingsHeader} = lang

    useEffect(checkTabInParams)

    return (
        <div className='settings-container'>
            <h1>{UserSettingsHeader}</h1>

            <div className='settings'>
                <Menu active={currentTab} onClick={changeTab} tabs={tabs}/>
                <SettingsBlock currentTab={currentTab} tabs={tabs}/>
            </div>
        </div>
    )
}
