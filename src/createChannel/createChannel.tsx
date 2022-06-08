import {Input} from "../elements/inputs/input";
import React, {useState} from "react";
import {Submit} from "../elements/inputs/submit";
import {useDispatch} from "react-redux";
import {fetchCreateChannel} from "../fetch/fetchCreateChannel";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {ApiRoutes} from "../fetch/apiRoutes";
import {Loading} from "../elements/loading/loading";

export function checkChannelLength(name: string) {
    return name.length <= 32
}

export function CreateChannel() {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let newErrors = {...errors}

        newErrors.name = !checkChannelLength(channelName) ? 'Channel name too long' : ''
        changeErrors(newErrors)
        if (newErrors.name) {
            return
        }

        dispatch(fetchCreateChannel(channelName) as any)
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
    const createChannelState = states[ApiRoutes.CreateChannel]

    const requested = createChannelState && createChannelState.dataState === dataStates.requested
    const hasError = createChannelState && createChannelState.status !== 200

    return (
        <div>
            <form className='app-form' onSubmit={submit}>
                <Input state={channelName}
                       setState={changeChannelName}
                       label='Name'
                       type='text'
                       errorText={errors.name}
                       onChange={checkChannelName}/>
                <p className='error-text'>{hasError && createChannelState.message}</p>

                <Submit label={requested ? <Loading/> : 'Create'}/>
            </form>
        </div>
    )
}