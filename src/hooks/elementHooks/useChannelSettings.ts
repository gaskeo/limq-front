import React, {useState} from "react";
import {useActions} from "../useActions";
import {useTypedSelector} from "../useTypedSelector";
import {useParams, useSearchParams} from "react-router-dom";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {dataStates} from "../../store/reducers/consts";
import {checkKeyLength} from "../../channelSettings/blocks/keysSettingsBlock";
import {checkChannelLength} from "../../createChannel/createChannel";
import {checkMixinLength, mixinTabs} from "../../channelSettings/blocks/mixinsSettingsBlock";
import {MixinTypeStates} from "../../store/reducers/mixinsReducer";

function useChannelSettings() {
    const {fetchCreateMixin, fetchRenameChannel, fetchCreateKey} = useActions()

    const {lang} = useTypedSelector(state => state.lang)

    const {channels} = useTypedSelector(state => state.channels)
    const {channelId} = useParams()
    const channel = channels.filter(channel => channel['channel_id'] === channelId)[0]
    return {
        lang, channel, fetchCreateMixin, fetchRenameChannel, fetchCreateKey
    }
}

export function useKeysSettingsBlock() {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        let newErrors = {...errors}
        newErrors.name = !checkKeyLength(keyName) ? lang.KeyNameTooLongError : ''
        changeErrors(newErrors)
        if (newErrors.name) {
            return
        }

        if (!channel) {
            return
        }

        fetchCreateKey(keyName, keyType, channel['channel_id'], allowInfo)
    }

    const {lang, channel, fetchCreateKey} = useChannelSettings()

    const {keysData} = useTypedSelector(state => state.keys)

    const currentKeys = keysData[channel ? channel['channel_id'] : '']
    const reversedKeys = currentKeys?.keys ? [...currentKeys.keys].reverse() : []
    const keysDataState = currentKeys?.keysDataState

    const [keyName, changeKeyName] = useState('')
    const [keyType, changeKeyType] = useState('0')
    const [allowInfo, changeAllowInfo] = useState(false)

    const [errors, changeErrors] = useState({name: ''})
    const {states} = useTypedSelector(state => state.fetch)

    const createKeyState = states[ApiRoutes.Grant]
    const requested = createKeyState && createKeyState.dataState === dataStates.requested
    const hasError = createKeyState && createKeyState.status !== 200

    const errorMessage = hasError && createKeyState.message

    return {
        reversedKeys,
        keysDataState,
        lang,
        keyName,
        changeKeyName,
        keyType,
        changeKeyType,
        allowInfo,
        changeAllowInfo,
        submit,
        errors,
        errorMessage,
        requested
    }
}

export function useMainSettingsBlock() {
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

    const {lang, channel, fetchRenameChannel} = useChannelSettings()

    const [channelName, changeChannelName] = useState('')
    const [errors, changeErrors] = useState({name: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const createChannelState = states[ApiRoutes.RenameChannel]

    const requested = createChannelState && createChannelState.dataState === dataStates.requested
    const hasError = createChannelState && createChannelState.status !== 200
    const errorMessage = hasError && createChannelState.message

    const placeholder = channel ? channel['channel_name'] : ''
    return {
        lang,
        channelName,
        changeChannelName,
        checkChannelName,
        placeholder,
        submit,
        errors,
        requested,
        errorMessage
    }
}

export function useMixinsSettingsBlock() {
    function checkTabInParams() {
        if (!searchParams.get('mixin-tab')) {
            changeTab(tabs[0].parameterName)()
        }
    }

    function changeTab(tab: string) {
        return function () {
            changeSearchParams({'mixin-tab': tab, 'tab': searchParams.get('tab') || ''})
        }
    }

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!channel) {
            return
        }

        let newErrors = {...errors}
        newErrors.mixin = !checkMixinLength(keyId) ? lang.WrongKeyError : ''
        changeErrors(newErrors)
        if (newErrors.mixin) {
            return
        }
        if (channel) {
            fetchCreateMixin(channel['channel_id'], keyId)
        }
    }

    function checkMixin(mixin: string) {
        if (checkMixinLength(mixin)) {
            return changeErrors({...errors, mixin: ''})
        }
    }

    const {lang, channel, fetchCreateMixin} = useChannelSettings()

    const [keyId, changeKeyId] = useState('')
    const [errors, changeErrors] = useState({mixin: ''})

    const [searchParams, changeSearchParams] = useSearchParams()

    const {states} = useTypedSelector(state => state.fetch)
    const createMixinState = states[ApiRoutes.CreateMixin]

    const tabs = mixinTabs({in: lang.MixinsIn, out: lang.MixinsOut})
    const activeTab = searchParams.get('mixin-tab') || MixinTypeStates.in

    const requested = createMixinState && createMixinState.dataState === dataStates.requested
    const hasError = createMixinState && createMixinState.status !== 200
    const errorMessage = hasError && createMixinState.message

    return {
        lang,
        keyId,
        changeKeyId,
        submit,
        errors,
        checkMixin,
        errorMessage,
        requested,
        activeTab,
        changeTab,
        tabs,
        checkTabInParams
    }
}
