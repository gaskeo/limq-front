import {MixinTypeStates} from "../../../store/reducers/mixinsReducer";
import {fetchRestrictMixin} from "../../../fetch/fetchRestrictMixin";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Channel} from "../../../store/reducers/channelsReducer";

export function MixinCard(props: { channel: Channel, mixinType: MixinTypeStates }) {
    function deleteMixin() {
        if (channelId && window.confirm('Delete key?')) {
            dispatch(fetchRestrictMixin(channelId, props.channel['channel_id'], props.mixinType) as any)
        }
    }

    const {channelId} = useParams()
    const dispatch = useDispatch()

    return (
        <div className='card card-100' key={props.channel["channel_id"]}>
            <div className='card-header-container'>
                <div className='card-header'>{props.channel['channel_name']}</div>
            </div>
            <div className='card-info-container'>
                <code className='card-code card-background-text'>{props.channel['channel_id']}</code>
                <button className='button mini-button error' onClick={deleteMixin}>Delete</button>
            </div>
        </div>
    )
}