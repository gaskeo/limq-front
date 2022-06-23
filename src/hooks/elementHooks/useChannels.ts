import {useTypedSelector} from "../useTypedSelector";

export function useChannels() {
    const {channels, channelsDataState} = useTypedSelector(state => state.channels)
    const {lang} = useTypedSelector(state => state.lang)
    const reversedChannels = [...channels].reverse()
    return {lang, reversedChannels, channels, channelsDataState}
}
