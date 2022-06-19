import React, {useState} from "react";
import {useActions} from "../useActions";
import {useTypedSelector} from "../useTypedSelector";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {dataStates} from "../../store/reducers/consts";

export function checkChannelLength(name: string) {
    return name.length <= 32
}

export function useCreateChannel() {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let newErrors = {...errors}

        newErrors.name = !checkChannelLength(channelName) ? lang.ChannelNameTooLong : ''
        changeErrors(newErrors)
        if (newErrors.name) {
            return
        }

        fetchCreateChannel(channelName)
    }

    function checkChannelName(name: string) {
        if (checkChannelLength(name)) {
            return changeErrors({...errors, name: ''})
        }
    }

    const {fetchCreateChannel} = useActions()

    const {lang} = useTypedSelector(state => state.lang)

    const [channelName, changeChannelName] = useState('')
    const [errors, changeErrors] = useState({name: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const createChannelState = states[ApiRoutes.CreateChannel]

    const requested = createChannelState && createChannelState.dataState === dataStates.requested
    const hasError = createChannelState && createChannelState.status !== 200
    const errorMessage = hasError && createChannelState.message

    return {
        lang,
        channelName,
        changeChannelName,
        checkChannelName,
        submit,
        errors,
        errorMessage,
        requested
    }
}