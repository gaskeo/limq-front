import {Channel} from "../../store/reducers/channelsReducer";
import {Circle} from "../../svg/circle";
import {Key} from "../../svg/key";
import {Settings} from "../../svg/settings";
import {Link} from "react-router-dom";
import {routes} from "../../routes/routes";
import React from "react";
import {useChannelCard} from "../../hooks/elementHooks/useCard";

interface channelCardProps {
    channel: Channel
}


export function ChannelCard({channel}: channelCardProps) {
    const {lang, activeChannel} = useChannelCard(channel)

    return (
        <Link to={routes.channelSettings.replace(':channelId', channel['channel_id'])}>
            <div className='card'>
                <div className='card-header-container'>
                    <h1 className='card-header'>{channel['channel_name']}</h1>
                    <Link className='card-icon-near-header'
                          to={routes.channelSettings.replace(':channelId', channel['channel_id'])}>
                        <Settings/>
                    </Link>
                </div>

                <div className='card-info-container'>
                    <code className='card-code'>#{channel['channel_id']}</code>
                    <div className='card-icon-and-text-container'>
                        <Circle active={activeChannel}/>
                        <span>{activeChannel ? lang.ChannelCardActive : lang.ChannelCardInactive}</span>
                    </div>
                    <div className='channel-card-keys-container'>
                        <span className='channel-card-key-icon'><Key/></span>
                        <span className='channel-card-key'>
                        {lang.ChannelCardRead}: <code>{channel['read_keys'].active}</code>
                    </span>
                        <span className='channel-card-key'>
                        {lang.ChannelCardWrite}: <code>{channel['write_keys'].active}</code>
                    </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
