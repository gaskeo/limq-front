import {useTypedSelector} from "../hooks/useTypedSelector";
import {useEffect} from "react";
import {dataStates} from "../store/reducers/consts";
import {useActions} from "../hooks/useActions";

interface settingsBlockProps {
    channelId: string | undefined,
    currentTab: string | null,
    tabs: { id: number, name: string, parameterName: string, block: () => (...parameters: any[]) => JSX.Element }[]
}

export function SettingsBlock({channelId, currentTab, tabs}: settingsBlockProps) {
    const {channels} = useTypedSelector(state => state.channels)
    const {keysData} = useTypedSelector(state => state.keys)
    const {mixinsData} = useTypedSelector(state => state.mixins)
    const currentChannel = channels.filter(channel => channel['channel_id'] === channelId)[0]

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

    const {fetchGetKeys, fetchGetMixins} = useActions()

    if (!currentChannel) {
        return null
    }
    return <div className='settings-block'>
        {tabs.map(tab => tab.block()(tab.parameterName === currentTab, currentChannel))}
    </div>
}