import {useParams, useSearchParams} from "react-router-dom";
import {Menu} from "../elements/menu/menu";
import {SettingsBlock} from "./settingsBlock";
import {Channel} from "../store/reducers/channelsReducer";
import "./channelSettings.css"
import {MainSettingsBlock} from "./blocks/mainSettingsBlock";
import {KeysSettingsBlock} from "./blocks/keysSettingsBlock";
import {MixinsSettingsBlock} from "./blocks/mixinsSettingsBlock";
import {useEffect} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";

export const menuTabs = (tabNames: { main: string, keys: string, mixins: string }) => [
    {
        name: tabNames.main,
        parameterName: 'mainSettings',
        id: 1,
        block: () => ((isCurrent: boolean, channel: Channel | undefined) => <MainSettingsBlock key='1'
                                                                                               isCurrent={isCurrent}
                                                                                               channel={channel}/>)
    },
    {
        name: tabNames.keys,
        parameterName: 'keys',
        id: 2,
        block: () => ((isCurrent: boolean, channel: Channel | undefined) => <KeysSettingsBlock key='2'
                                                                                               isCurrent={isCurrent}
                                                                                               channel={channel}/>)
    },
    {
        name: tabNames.mixins,
        parameterName: 'mixins',
        id: 3,
        block: () => ((isCurrent: boolean, channel: Channel | undefined) => <MixinsSettingsBlock key='3'
                                                                                                 isCurrent={isCurrent}
                                                                                                 channel={channel}/>)
    }
]


export function ChannelSettings() {
    function changeTab(tab: string) {
        return function () {
            changeSearchParams({'tab': tab})
        }
    }

    const {channelId} = useParams()
    const {lang} = useTypedSelector(state => state.lang)
    const [searchParams, changeSearchParams] = useSearchParams()
    const tabs = menuTabs({
        main: lang.ChannelSettingsMenuMainSettings,
        keys: lang.ChannelSettingsMenuKeys, mixins: lang.ChannelSettingsMenuMixins
    })

    useEffect(() => {
        if (!searchParams.get('tab')) {
            changeTab(tabs[0].parameterName)()
        }
    })

    return (
        <div className='settings-container'>
            <h1 className='header-1'>{lang.ChannelSettingsHeader}</h1>
            <div className='settings'>
                <Menu active={searchParams.get('tab')} onClick={changeTab} tabs={tabs}/>
                <SettingsBlock channelId={channelId} currentTab={searchParams.get('tab')} tabs={tabs}/>
            </div>
        </div>
    )
}