import {useTypedSelector} from "../hooks/useTypedSelector";
import {ChannelCard} from "./channelCard/channelCard";
import {CreateChannelCard} from "./channelCard/createChannelCard";
import {LoadingChannelCard} from "./channelCard/loadingCard";
import {dataStates} from "../store/reducers/consts";

export function RegisterBody() {
    const {channels, channelsDataState} = useTypedSelector(state => state.channels)
    const reversedChannels = [...channels].reverse()
    return (
        <div>
            <h1 className='header-1'>Channels</h1>
            <div className='card-container'>
                {channelsDataState === dataStates.requested && <LoadingChannelCard/>}
                {channels && reversedChannels.map(channel => <ChannelCard key={channel.channel_id} channel={channel}/>)}
                <CreateChannelCard/>
            </div>
        </div>
    )
}