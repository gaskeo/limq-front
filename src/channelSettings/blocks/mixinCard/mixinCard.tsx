import {MixinTypeStates} from "../../../store/reducers/mixinsReducer";
import {useParams} from "react-router-dom";
import {Channel} from "../../../store/reducers/channelsReducer";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

interface mixinCardProps {
    channel: Channel,
    mixinType: MixinTypeStates
}

export function MixinCard({channel, mixinType}: mixinCardProps) {
    function deleteMixin() {
        if (channelId && window.confirm(lang.DeleteMixinConfirmQuestion)) {
            fetchRestrictMixin(channelId, channel['channel_id'], mixinType)
        }
    }

    const {channelId} = useParams()
    const {lang} = useTypedSelector(state => state.lang)
    const {fetchRestrictMixin} = useActions()

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