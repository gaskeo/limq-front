import {Key} from "../../../store/reducers/keysReducer";
import React from "react";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {ApiRoutes} from "../../../store/actionCreators/apiRoutes";
import {dataStates} from "../../../store/reducers/consts";
import {Loading} from "../../../elements/loading/loading";
import {useActions} from "../../../hooks/useActions";

interface keyCardProps {
    channelKey: Key
}

export function KeyCard({channelKey}: keyCardProps) {
    function toggleActiveKey() {
        fetchToggleKey(channelKey)
    }

    function deleteKey() {
        if (window.confirm('Delete key?')) {
            fetchDeleteKey(channelKey.channel, channelKey)
        }
    }

    const {fetchDeleteKey, fetchToggleKey} = useActions()
    const perm = channelKey.read ? 'Read' : 'write'

    const {states} = useTypedSelector(state => state.fetch)
    const toggleKey = states[ApiRoutes.ToggleKey + channelKey.key]

    const requested = toggleKey && toggleKey.dataState === dataStates.requested

    const pauseResume = requested ?
        <div className='warning-loading'><Loading diameter='10px'/></div> : (channelKey.active ? 'Pause' : 'Resume')

    return (
        <div className='card card-100 horizontal-scroll'>
            <div className='card-header-container'>
                <h1 className='card-header'>{channelKey.name}</h1>
            </div>
            <div className='card-info-container'>
                <p className='card-text grey-text'>{perm}, {channelKey.created}</p>
                <code className='card-code card-background-text'>{channelKey.key}</code>
                <div className='card-inline-block'>
                    <button className='button mini-button warning' onClick={toggleActiveKey}>{pauseResume}</button>
                    <button className='button mini-button error' onClick={deleteKey}>Delete</button>
                </div>
            </div>
        </div>
    )
}
