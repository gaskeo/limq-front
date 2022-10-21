import {useTypedSelector} from "../useTypedSelector";

export function useChannels() {
    const {channels, channelsDataState} = useTypedSelector(state => state.channels)
    const {lang} = useTypedSelector(state => state.lang)
    const {quota} = useTypedSelector(state => state.quota)
    let availableChannels = 0;

    if (quota?.name && quota['max_channel_count']) {
        availableChannels = quota['max_channel_count']
    }
    const reversedChannels = [...channels].reverse()
    let usedChannels = channels.length
    return {lang, reversedChannels, channels, channelsDataState, availableChannels, usedChannels}
}
