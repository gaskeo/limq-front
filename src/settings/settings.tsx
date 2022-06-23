import {useEffect} from "react";
import {SettingsBlock} from "../elements/menu/settingsBlock";
import {useSettings} from "../hooks/elementHooks/useSettings";




export function MainSettings() {
    const {checkTabInParams, tabs, currentTab} = useSettings()

    useEffect(() => {
        checkTabInParams()
    })

    return (
        <div className='settings-without-menu'>
            <SettingsBlock currentTab={currentTab} tabs={tabs}/>
        </div>
    )
}
