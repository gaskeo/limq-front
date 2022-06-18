import {useParams, useSearchParams} from "react-router-dom";
import {Menu} from "../elements/menu/menu";
import {SettingsBlock} from "../elements/menu/settingsBlock";
import "./channelSettings.css"
import {MainSettingsBlock} from "./blocks/mainSettingsBlock";
import {KeysSettingsBlock} from "./blocks/keysSettingsBlock";
import {MixinsSettingsBlock} from "./blocks/mixinsSettingsBlock";
import {useEffect} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {useActions} from "../hooks/useActions";

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
    useEffect(() => {
        if (!searchParams.get('tab')) {
            changeTab(tabs[0].parameterName)()
        }
    })

    function changeTab(tab: string) {
        return function () {
            changeSearchParams({'mixin-tab': searchParams.get('mixin-tab') || '', 'tab': tab}, {replace: false})
        }
    }

    const {fetchGetKeys, fetchGetMixins} = useActions()
    const [searchParams, changeSearchParams] = useSearchParams()

    const {lang} = useTypedSelector(state => state.lang)
    const tabs = menuTabs({
        main: lang.ChannelSettingsMenuMainSettings,
        keys: lang.ChannelSettingsMenuKeys, mixins: lang.ChannelSettingsMenuMixins
    })

    const {channels} = useTypedSelector(state => state.channels)
    const {channelId} = useParams()

    const currentChannel = channels.filter(channel => channel['channel_id'] === channelId)[0]

    const {keysData} = useTypedSelector(state => state.keys)
    const {mixinsData} = useTypedSelector(state => state.mixins)

    useEffect(() => {
        const falseStatement = !currentChannel || (keysData[currentChannel['channel_id']] &&
            keysData[currentChannel['channel_id']].keysDataState === dataStates.requested)
        if (falseStatement) {
            return;
        }
        const trueStatement = !keysData[currentChannel['channel_id']] ||
            keysData[currentChannel['channel_id']].keysDataState === dataStates.notRequested

        if (trueStatement) {
            fetchGetKeys(currentChannel['channel_id'])
        }

    })

    useEffect(() => {
        const falseStatement = !currentChannel ||
            (mixinsData[currentChannel['channel_id']] &&
                mixinsData[currentChannel['channel_id']].mixinsDataState === dataStates.requested)
        if (falseStatement) {
            return
        }

        const trueStatement = !mixinsData[currentChannel['channel_id']] ||
            mixinsData[currentChannel['channel_id']].mixinsDataState === dataStates.notRequested
        if (trueStatement) {
            fetchGetMixins(currentChannel['channel_id'])
        }

    })

    return (
        <div className='settings-container'>
            <h1 className='header-1'>{lang.ChannelSettingsHeader}</h1>
            <div className='settings'>
                <>
                    <Menu active={searchParams.get('tab')} onClick={changeTab} tabs={tabs}/>
                    <SettingsBlock tabs={tabs} currentTab={searchParams.get('tab')}/>
                </>
            </div>
        </div>
    )
}