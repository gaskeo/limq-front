import {Input} from "../../elements/inputs/input";
import React, {useState} from "react";
import {Submit} from "../../elements/inputs/submit";
import {Channel} from "../../store/reducers/channelsReducer";
import {useDispatch} from "react-redux";
import {fetchRenameChannel} from "../../fetch/fetchRenameChannel";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {checkChannelLength} from "../../createChannel/createChannel";
import {dataStates} from "../../store/reducers/consts";
import {ApiRoutes} from "../../fetch/apiRoutes";
import {Loading} from "../../elements/loading/loading";

export function MainSettingsBlock(props: { isCurrent: boolean, channel: Channel | undefined }) {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!props.channel) {
            return
        }

        let newErrors = {...errors}

        newErrors.name = !checkChannelLength(channelName) ? 'Channel name too long' : ''
        changeErrors(newErrors)
        if (newErrors.name) {
            return
        }

        dispatch(fetchRenameChannel(props.channel['channel_id'], channelName) as any)
    }

    function checkChannelName(name: string) {
        if (checkChannelLength(name)) {
            return changeErrors({...errors, name: ''})
        }
    }

    const dispatch = useDispatch()

    const [channelName, changeChannelName] = useState('')
    const [errors, changeErrors] = useState({name: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const createChannelState = states[ApiRoutes.RenameChannel]

    const requested = createChannelState && createChannelState.dataState === dataStates.requested
    const hasError = createChannelState && createChannelState.status !== 200

    if (!props.isCurrent) {
        return null
    }

    const placeholder = props.channel ? props.channel['channel_name'] : ''

    return (
        <div>
            <h1 className='header-1'>Main settings</h1>
            <form onSubmit={submit}>
                <Input state={channelName}
                       setState={changeChannelName}
                       label='Name'
                       type='text'
                       errorText={errors.name}
                       onChange={checkChannelName}
                       placeholder={placeholder}/>
                <p className='error-text'>{hasError && createChannelState.message}</p>

                <Submit label={requested ? <Loading/> : 'Rename'}/>
            </form>
        </div>
    )
}