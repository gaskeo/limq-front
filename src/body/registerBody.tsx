import {ChannelCard} from "./channelCard/channelCard";
import {CreateChannelCard} from "./channelCard/createChannelCard";
import {LoadingChannelCard} from "./channelCard/loadingCard";
import {dataStates} from "../store/reducers/consts";
import {useChannels} from "../hooks/elementHooks/useChannels";

export function RegisterBody() {
    const {lang, reversedChannels, channels, channelsDataState, availableChannels, usedChannels} = useChannels()

    return (
        <div>
            <h1>{lang.RegisterChannelsHeader}</h1>
            <div className='card-container'>
                {channelsDataState === dataStates.requested && <LoadingChannelCard/>}
                {channels && reversedChannels.map(channel => <ChannelCard key={channel['channel_id']} channel={channel}/>)}
                {channelsDataState === dataStates.received
                && <CreateChannelCard availableChannels={availableChannels} usedChannels={usedChannels}/>}
            </div>
        </div>
    )
}
