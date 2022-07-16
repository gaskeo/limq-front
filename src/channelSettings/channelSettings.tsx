import {Menu} from "../elements/menu/menu";
import {SettingsBlock} from "../elements/menu/settingsBlock";
import {memo, useEffect} from "react";
import {useChannelSettings} from "../hooks/elementHooks/useChannelSettings";

export const ChannelSettings = memo(() => {
    const {lang, activeTab, changeTab, tabs, fetchAll, checkTabInParams} = useChannelSettings()

    const {ChannelSettingsHeader} = lang

    useEffect(checkTabInParams)
    useEffect(fetchAll)

    return (
        <div className='settings-container'>
            <h1>{ChannelSettingsHeader}</h1>
            <div className='settings'>
                <>
                    <Menu active={activeTab} onClick={changeTab} tabs={tabs}/>
                    <SettingsBlock tabs={tabs} currentTab={activeTab}/>
                </>
            </div>
        </div>
    )
})
