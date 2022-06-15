import {useTypedSelector} from "../hooks/useTypedSelector";
import {useEffect} from "react";
import {dataStates} from "../store/reducers/consts";
import {menuTabs} from "./channelSettings";
import {useActions} from "../hooks/useActions";

interface settingsBlockProps {
    channelId: string | undefined,
    currentTab: string | null
}

export function SettingsBlock({channelId, currentTab}: settingsBlockProps) {
    const {channels} = useTypedSelector(state => state.channels)
    const {keysData} = useTypedSelector(state => state.keys)
    const {mixinsData} = useTypedSelector(state => state.mixins)
    const currentChannel = channels.filter(channel => channel['channel_id'] === channelId)[0]

    useEffect(() => {
        if (!currentChannel) {
            return;
        }
        if (keysData[currentChannel['channel_id']] && keysData[currentChannel['channel_id']].keysDataState === dataStates.requested) {
            return
        }
        if (!keysData[currentChannel['channel_id']] || keysData[currentChannel['channel_id']].keysDataState === dataStates.notRequested) {
            fetchGetKeys(currentChannel['channel_id'])
        }

    })

    useEffect(() => {
        if (!currentChannel) {
            return;
        }
        if (mixinsData[currentChannel['channel_id']] && mixinsData[currentChannel['channel_id']].mixinsDataState === dataStates.requested) {
            return
        }
        if (!mixinsData[currentChannel['channel_id']] || mixinsData[currentChannel['channel_id']].mixinsDataState === dataStates.notRequested) {
            fetchGetMixins(currentChannel['channel_id'])
        }

    })

    const {fetchGetKeys, fetchGetMixins} = useActions()

    if (!currentChannel) {
        return null
    }
    return <div className='settings-block'>
        {menuTabs.map(tab => tab.block()(tab.parameterName === currentTab, currentChannel))}
    </div>
}