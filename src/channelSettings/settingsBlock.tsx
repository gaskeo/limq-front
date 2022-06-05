import {useTypedSelector} from "../hooks/useTypedSelector";
import {tabs} from "./menu";

export function SettingsBlock(props: { channelId: string | undefined, currentTab: string | null }) {
    const {channels} = useTypedSelector(state => state.channels)
    const currentChannel = channels.filter(channel => channel['channel_id'] === props.channelId)[0]
    if (!currentChannel) {
        return null
    }
    return <div className='channel-settings-block'>
        {tabs.map(tab => tab.block()(tab.parameterName === props.currentTab, currentChannel))}
    </div>
}