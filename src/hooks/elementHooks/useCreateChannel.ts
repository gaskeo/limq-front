import React, {useEffect, useState} from "react";
import {useActions} from "../useActions";
import {useTypedSelector} from "../useTypedSelector";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {dataStates} from "../../store/reducers/consts";
import {getErrorDescription} from "../../lang/getServerErrorDescription";
import {useDispatch} from "react-redux";
import { PathActionTypes } from "../../store/reducers/pathReducer";
import {routes} from "../../routes/routes";


const maxChannelLength = 64

export function checkChannelLength(name: string) {
    return name.length <= maxChannelLength
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

        fetchCreateChannel(channelName, messageSizeKb, bufferization, bufferedMessageCount,
            bufferedDataPersistency, endToEndDataEncryption && false)
    }

    function checkChannelName(name: string) {
        if (checkChannelLength(name)) {
            return changeErrors({...errors, name: ''})
        }
    }

    const {fetchCreateChannel} = useActions()

    const {lang} = useTypedSelector(state => state.lang)
    const {quota} = useTypedSelector(state => state.quota)

    const maxMessageSize = quota['max_message_size'] || 256
    const maxBufferedMessageCount = quota['max_bufferred_message_count'] || 256
    const maxBufferedDataPersistency = quota['buffered_data_persistency'] || 12

    const {user, userDataState} = useTypedSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userDataState === dataStates.received && user.id === '') {
            dispatch({type: PathActionTypes.deletePath})
            dispatch({type: PathActionTypes.setPath, payload: routes.login})
        }
    }, [user, userDataState])

    const [channelName, changeChannelName] = useState('')
    const [errors, changeErrors] = useState({name: ''})

    const [messageSizeKb, changeMessageSizeKb] = useState(maxMessageSize);
    const [bufferization, changeBufferization] = useState(true);
    const [bufferedMessageCount, changeBufferedMessageCount] = useState(maxBufferedMessageCount)
    const [bufferedDataPersistency, changeBufferedDataPersistency] = useState(maxBufferedDataPersistency)
    const [endToEndDataEncryption, changeEndToEndDataEncryption] = useState(true)

    const {states} = useTypedSelector(state => state.fetch)
    const createChannelState = states[ApiRoutes.CreateChannel]

    const requested = createChannelState && createChannelState.dataState === dataStates.requested
    const hasError = createChannelState && createChannelState.status !== 200
    const errorMessage = hasError ? getErrorDescription(lang, createChannelState.code) : ''

    return {
        lang,
        channelName,
        changeChannelName,
        checkChannelName,
        submit,
        errors,
        errorMessage,
        requested,
        messageSizeKb,
        changeMessageSizeKb,
        bufferization,
        changeBufferization,
        bufferedMessageCount,
        changeBufferedMessageCount,
        bufferedDataPersistency,
        changeBufferedDataPersistency,
        endToEndDataEncryption,
        changeEndToEndDataEncryption,
        maxBufferedMessageCount,
        maxMessageSize,
        maxBufferedDataPersistency
    }
}
