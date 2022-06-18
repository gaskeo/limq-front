import {MixinTypeStates} from "../../../store/reducers/mixinsReducer";
import {Channel} from "../../../store/reducers/channelsReducer";
import {useMixinCard} from "../../../hooks/elementHooks/useCard";

interface mixinCardProps {
    channel: Channel,
    mixinType: MixinTypeStates
}

export function MixinCard({channel, mixinType}: mixinCardProps) {
    const {deleteMixin, lang} = useMixinCard(channel, mixinType)

    return (
        <div className='card card-100' key={channel["channel_id"]}>
            <div className='card-header-container'>
                <div className='card-header'>{channel['channel_name']}</div>
            </div>
            <div className='card-info-container'>
                <code className='card-code card-background-text'>{channel['channel_id']}</code>
                <button className='button mini-button error' onClick={deleteMixin}>{lang.DeleteMixinButton}</button>
            </div>
        </div>
    )
}