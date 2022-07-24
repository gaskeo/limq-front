import {Menu} from "../elements/menu/menu";
import {SettingsBlock} from "../elements/menu/settingsBlock";
import {useUserSettings} from "../hooks/elementHooks/useUserSettings";

export function UserSettings() {
    const {lang, changeTab, tabs, currentTab} = useUserSettings()

    const {UserSettingsHeader} = lang

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
