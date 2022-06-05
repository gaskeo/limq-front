import {channel} from "../store/reducers/channelsReducer";
import {Circle} from "../svg/circle";
import {Key} from "../svg/key";
import {Settings} from "../svg/settings";
import {useNavigate} from "react-router-dom";
import {routes} from "../routes/routes";

export function ChannelCard(props: { channel: channel }) {
    function onClick() {
        return function () {
            navigate(routes.channelSettings.replace(':channel_id', props.channel.channel_id))
        }
    }
    const navigate = useNavigate()

    const activeChannel = Boolean(props.channel.write_keys.active || props.channel.read_keys.active)

    return (
        <div className='channel-card'>
            <div className='channel-card-header-container'>
                <h1 className='channel-card-header'>{props.channel.channel_name}</h1>
                <span className='channel-card-settings-icon' onClick={onClick()}><Settings/></span>
            </div>
            <div className='channel-card-info'>
                <code className='channel-card-id'>#{props.channel.channel_id}</code>
                <div className='channel-card-status'>
                    <Circle active={activeChannel}/>

                    <span>{activeChannel ? 'Active' : 'Inactive'}</span>
                </div>
                <div className='channel-card-keys-container'>
                    <span className='channel-card-key-icon'><Key/></span>
                    <span className='channel-card-key'>R: <code>{props.channel.read_keys.active}</code></span>
                    <span className='channel-card-key'>W: <code>{props.channel.write_keys.active}</code></span>
                </div>
            </div>
        </div>
    )
}
