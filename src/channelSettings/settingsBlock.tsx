import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {dataStates} from "../store/reducers/consts";
import {fetchGetKeys} from "../fetch/fetchGetKeys";
import {fetchGetMixins} from "../fetch/fetchGetMixins";
import {menuTabs} from "./channelSettings";


export function SettingsBlock(props: { channelId: string | undefined, currentTab: string | null }) {
    const {channels} = useTypedSelector(state => state.channels)
    const {keysData} = useTypedSelector(state => state.keys)
    const {mixinsData} = useTypedSelector(state => state.mixins)
    const currentChannel = channels.filter(channel => channel['channel_id'] === props.channelId)[0]

    useEffect(() => {
        if (!currentChannel) {
            return;
        }
        if (keysData[currentChannel['channel_id']] && keysData[currentChannel['channel_id']].keysDataState === dataStates.requested) {
            return
        }
        if (!keysData[currentChannel['channel_id']] || keysData[currentChannel['channel_id']].keysDataState === dataStates.notRequested) {
            dispatch(fetchGetKeys(currentChannel['channel_id']) as any)
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
            dispatch(fetchGetMixins(currentChannel['channel_id']) as any)
        }

    })

    const dispatch = useDispatch()

    if (!currentChannel) {
        return null
    }
    return <div className='channel-settings-block'>
        {menuTabs.map(tab => tab.block()(tab.parameterName === props.currentTab, currentChannel))}
    </div>
}