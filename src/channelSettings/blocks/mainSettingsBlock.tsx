import {Input} from "../../elements/inputs/input";
import React, {useState} from "react";
import {Submit} from "../../elements/inputs/submit";
import {Channel} from "../../store/reducers/channelsReducer";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {checkChannelLength} from "../../createChannel/createChannel";
import {dataStates} from "../../store/reducers/consts";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {Loading} from "../../elements/loading/loading";
import {useActions} from "../../hooks/useActions";

interface mainSettingsBlockProps {
    isCurrent: boolean,
    channel: Channel | undefined
}

export function MainSettingsBlock({isCurrent, channel}: mainSettingsBlockProps) {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!channel) {
            return
        }

        let newErrors = {...errors}

        newErrors.name = !checkChannelLength(channelName) ? lang.ChannelNameTooLong : ''
        changeErrors(newErrors)
        if (newErrors.name) {
            return
        }

        fetchRenameChannel(channel['channel_id'], channelName)
    }

    function checkChannelName(name: string) {
        if (checkChannelLength(name)) {
            return changeErrors({...errors, name: ''})
        }
    }

    const {fetchRenameChannel} = useActions()

    const [channelName, changeChannelName] = useState('')
    const [errors, changeErrors] = useState({name: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const {lang} = useTypedSelector(state => state.lang)
    const createChannelState = states[ApiRoutes.RenameChannel]

    const requested = createChannelState && createChannelState.dataState === dataStates.requested
    const hasError = createChannelState && createChannelState.status !== 200

    if (!isCurrent) {
        return null
    }

    const placeholder = channel ? channel['channel_name'] : ''

    return (
        <div>
            <h1 className='header-1'>{lang.RenameChannelHeader}</h1>
            <form onSubmit={submit}>
                <Input state={channelName}
                       setState={changeChannelName}
                       label={lang.ChannelNameForm}
                       type='text'
                       errorText={errors.name}
                       onChange={checkChannelName}
                       placeholder={placeholder}/>
                <p className='error-text'>{hasError && createChannelState.message}</p>

                <Submit label={requested ? <Loading/> : lang.RenameChannelButton}/>
            </form>
        </div>
    )
}