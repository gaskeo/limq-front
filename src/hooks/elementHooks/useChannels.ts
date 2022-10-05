import {useTypedSelector} from "../useTypedSelector";

export function useChannels() {
    const {channels, channelsDataState} = useTypedSelector(state => state.channels)
    const {lang} = useTypedSelector(state => state.lang)
    const {quota} = useTypedSelector(state => state.quota)
    let leftChannels = 0;
    console.log(quota)
    console.log(quota['max_channel_count'])
    if (quota['max_channel_count']) {
        leftChannels = quota['max_channel_count'] - (channels.length ? channels.length : 0)
    }
    const reversedChannels = [...channels].reverse()
    return {lang, reversedChannels, channels, channelsDataState, leftChannels}
}
