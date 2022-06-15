import {Channel} from "../../store/reducers/channelsReducer";
import {Circle} from "../../svg/circle";
import {Key} from "../../svg/key";
import {Settings} from "../../svg/settings";
import {Link} from "react-router-dom";
import {routes} from "../../routes/routes";
import React from "react";

interface channelCardProps {
    channel: Channel
}

export function ChannelCard({channel}: channelCardProps) {
    const activeChannel = Boolean(channel.write_keys.active || channel.read_keys.active)

    return (
        <div className='card'>
            <div className='card-header-container'>
                <h1 className='card-header'>{channel.channel_name}</h1>
                <Link className='card-icon-near-header'
                      to={routes.channelSettings.replace(':channelId', channel.channel_id)}>
                    <Settings/>
                </Link>
            </div>
            <div className='card-info-container'>
                <code className='card-code'>#{channel.channel_id}</code>
                <div className='card-icon-and-text-container'>
                    <Circle active={activeChannel}/>

                    <span>{activeChannel ? 'Active' : 'Inactive'}</span>
                </div>
                <div className='channel-card-keys-container'>
                    <span className='channel-card-key-icon'><Key/></span>
                    <span className='channel-card-key'>R: <code>{channel.read_keys.active}</code></span>
                    <span className='channel-card-key'>W: <code>{channel.write_keys.active}</code></span>
                </div>
            </div>
        </div>
    )
}
