import {useParams, useSearchParams} from "react-router-dom";
import {Menu} from "../elements/menu/menu";
import {SettingsBlock} from "./settingsBlock";
import {Channel} from "../store/reducers/channelsReducer";
import "./channelSettings.css"
import {MainSettingsBlock} from "./blocks/mainSettingsBlock";
import {KeysSettingsBlock} from "./blocks/keysSettingsBlock";
import {MixinsSettingsBlock} from "./blocks/mixinsSettingsBlock";
import {useEffect} from "react";

export const menuTabs = [
    {name: 'Main settings', parameterName: 'mainSettings',
        id: 1, block: () => ((isCurrent: boolean, channel: Channel | undefined) => <MainSettingsBlock key='1' isCurrent={isCurrent} channel={channel}/>)},
    {name: 'Keys', parameterName: 'keys',
        id: 2, block: () => ((isCurrent: boolean, channel: Channel | undefined) => <KeysSettingsBlock key='2' isCurrent={isCurrent} channel={channel}/>)},
    {name: 'Mixins', parameterName: 'mixins',
        id: 3, block: () => ((isCurrent: boolean, channel: Channel | undefined) => <MixinsSettingsBlock key='3' isCurrent={isCurrent} channel={channel}/>)}
]


export function ChannelSettings() {
    function changeTab(tab: string) {
        return function () {
            changeSearchParams({'tab': tab})
        }
    }

    const {channelId} = useParams()
    const [searchParams, changeSearchParams] = useSearchParams()

    useEffect(() => {
        if (!searchParams.get('tab')) {
            changeTab(menuTabs[0].parameterName)()
        }
    })

    return (
        <div className='settings'>
            <Menu active={searchParams.get('tab')} onClick={changeTab} tabs={menuTabs}/>
            <SettingsBlock channelId={channelId} currentTab={searchParams.get('tab')}/>
        </div>
    )
}