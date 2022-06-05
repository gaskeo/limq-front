import {channel} from "../../store/reducers/channelsReducer";

export function KeysSettingsBlock(props: { isCurrent: boolean, channel: channel | undefined }) {
    if (!props.isCurrent) {
        return null
    }
    return <p>keys</p>
}