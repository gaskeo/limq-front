import {useTypedSelector} from "../hooks/useTypedSelector";
import {tabs} from "./menu";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {dataStates} from "../store/reducers/consts";
import {fetchGetKeys} from "../fetch/fetchGetKeys";

export function SettingsBlock(props: { channelId: string | undefined, currentTab: string | null }) {
    const {channels} = useTypedSelector(state => state.channels)
    const {keys} = useTypedSelector(state => state.keys)
    const currentChannel = channels.filter(channel => channel['channel_id'] === props.channelId)[0]

    useEffect(() => {
        if (!currentChannel) {
            return;
        }
        if (keys[currentChannel['channel_id']] && keys[currentChannel['channel_id']].keysDataState === dataStates.requested) {
            return
        }
        if (!keys[currentChannel['channel_id']] || keys[currentChannel['channel_id']].keysDataState === dataStates.notRequested) {
            dispatch(fetchGetKeys(currentChannel['channel_id']) as any)
        }

    })

    const dispatch = useDispatch()

    if (!currentChannel) {
        return null
    }
    return <div className='channel-settings-block'>
        {tabs.map(tab => tab.block()(tab.parameterName === props.currentTab, currentChannel))}
    </div>
}