import {Menu} from "../elements/menu/menu";
import {SettingsBlock} from "../elements/menu/settingsBlock";
import "./channelSettings.css"
import {MainSettingsBlock} from "./blocks/mainSettingsBlock";
import {KeysSettingsBlock} from "./blocks/keysSettingsBlock";
import {MixinsSettingsBlock} from "./blocks/mixinsSettingsBlock";
import {useEffect} from "react";
import {useChannelSettings} from "../hooks/elementHooks/useChannelSettings";

export const menuTabs = (tabNames: { main: string, keys: string, mixins: string }) => [
    {
        name: tabNames.main,
        parameterName: 'mainSettings',
        id: 1,
        block: (() => <MainSettingsBlock key='1'/>)
    },
    {
        name: tabNames.keys,
        parameterName: 'keys',
        id: 2,
        block: (() => <KeysSettingsBlock key='2'/>)
    },
    {
        name: tabNames.mixins,
        parameterName: 'mixins',
        id: 3,
        block: (() => <MixinsSettingsBlock key='3'/>)
    }
]

export function ChannelSettings() {
    const {lang, activeTab, changeTab, tabs, fetchAll, checkTabInParams} = useChannelSettings()

    const {ChannelSettingsHeader} = lang

    useEffect(checkTabInParams)
    useEffect(fetchAll)

    return (
        <div className='settings-container'>
            <h1 className='header-1'>{ChannelSettingsHeader}</h1>
            <div className='settings'>
                <>
                    <Menu active={activeTab} onClick={changeTab} tabs={tabs}/>
                    <SettingsBlock tabs={tabs} currentTab={activeTab}/>
                </>
            </div>
        </div>
    )
}