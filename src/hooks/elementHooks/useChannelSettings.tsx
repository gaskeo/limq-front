import React, {useState} from "react";
import {useActions} from "../useActions";
import {useTypedSelector} from "../useTypedSelector";
import {useParams, useSearchParams} from "react-router-dom";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {dataStates} from "../../store/reducers/consts";
import {checkKeyLength, KeysSettingsBlock} from "../../channelSettings/blocks/keysSettingsBlock";
import {checkChannelLength} from "./useCreateChannel";
import {MixinTypeStates} from "../../store/reducers/mixinsReducer";
import {MixinsContainer} from "../../channelSettings/blocks/mixinsContainer";
import {MainSettingsBlock} from "../../channelSettings/blocks/mainSettingsBlock";
import {MixinsSettingsBlock} from "../../channelSettings/blocks/mixinsSettingsBlock";
import {getErrorDescription} from "../../lang/getServerErrorDescription";

const params = {
    tab: 'tab',
    mixinTab: 'mixin-tab'
}

export function checkMixinLength(mixin: string) {
    return mixin.length === 32
}

const mixinTabs = (names: { in: string, out: string }) => [
    {
        name: names.in, parameterName: 'in',
        id: 1, block: () =>
            <MixinsContainer key='1'/>
    },
    {
        name: names.out, parameterName: 'out',
        id: 2, block: () =>
            <MixinsContainer key='2'/>
    },
]

export const menuTabs = (tabNames: { main: string, keys: string, mixins: string }) => [
    {
        name: tabNames.main,
        parameterName: 'mainSettings',
        id: 1,
        block: (() => <MainSettingsBlock key='1'/>)
    },
    {
        name: tabNames.keys,
        parameterName: 'keys',
        id: 2,
        block: (() => <KeysSettingsBlock key='2'/>)
    },
    {
        name: tabNames.mixins,
        parameterName: 'mixins',
        id: 3,
        block: (() => <MixinsSettingsBlock key='3'/>)
    }
]

function useChannelSettingsBase() {
    const {fetchCreateMixin, fetchRenameChannel, fetchCreateKey, fetchGetKeys, fetchGetMixins} = useActions()

    const {lang} = useTypedSelector(state => state.lang)

    const {channels} = useTypedSelector(state => state.channels)
    const {channelId} = useParams()
    const channel = channels.filter(channel => channel['channel_id'] === channelId)[0]
    return {
        lang, channel, fetchCreateMixin, fetchRenameChannel, fetchCreateKey, fetchGetKeys, fetchGetMixins
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

        fetchCreateKey(keyName, keyType, channel['channel_id'], allowInfo, disallowMixins)
    }

    const {lang, channel, fetchCreateKey} = useChannelSettingsBase()

    const {keysData} = useTypedSelector(state => state.keys)

    const currentKeys = keysData[channel ? channel['channel_id'] : '']
    const reversedKeys = currentKeys?.keys ? [...currentKeys.keys].reverse() : []
    const keysDataState = currentKeys?.keysDataState

    const [keyName, changeKeyName] = useState('')
    const [keyType, changeKeyType] = useState('0')
    const [allowInfo, changeAllowInfo] = useState(false)
    const [disallowMixins, changeDisallowMixins] = useState(false)

    const [errors, changeErrors] = useState({name: ''})
    const {states} = useTypedSelector(state => state.fetch)

    const createKeyState = states[ApiRoutes.Grant]
    const requested = createKeyState && createKeyState.dataState === dataStates.requested
    const hasError = createKeyState && createKeyState.status !== 200

    const errorMessage = hasError ? getErrorDescription(lang, createKeyState.code) : ''

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
        disallowMixins,
        changeDisallowMixins,
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

    const {lang, channel, fetchRenameChannel} = useChannelSettingsBase()

    const [channelName, changeChannelName] = useState('')
    const [errors, changeErrors] = useState({name: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const createChannelState = states[ApiRoutes.RenameChannel]

    const requested = createChannelState && createChannelState.dataState === dataStates.requested
    const hasError = createChannelState && createChannelState.status !== 200
    const errorMessage = hasError ? getErrorDescription(lang, createChannelState.code) : ''

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
        if (!searchParams.get(params.mixinTab)) {
            changeTab(tabs[0].parameterName)()
        }
    }

    function changeTab(tab: string) {
        return function () {
            changeSearchParams(
                {
                    [params.mixinTab]: tab,
                    [params.tab]: searchParams.get(params.tab) || '',
                })
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

    const {lang, channel, fetchCreateMixin} = useChannelSettingsBase()

    const [keyId, changeKeyId] = useState('')
    const [errors, changeErrors] = useState({mixin: ''})

    const [searchParams, changeSearchParams] = useSearchParams()

    const {states} = useTypedSelector(state => state.fetch)
    const createMixinState = states[ApiRoutes.CreateMixin]

    const tabs = mixinTabs({in: lang.MixinsIn, out: lang.MixinsOut})
    const activeTab = searchParams.get(params.mixinTab) || MixinTypeStates.in

    const requested = createMixinState && createMixinState.dataState === dataStates.requested
    const hasError = createMixinState && createMixinState.status !== 200
    const errorMessage = hasError ? getErrorDescription(lang, createMixinState.code) : ''

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


export function useMixinContainer() {
    const [searchParams] = useSearchParams()

    const {channels} = useTypedSelector(state => state.channels)
    const {channelId} = useParams()
    const channel = channels.filter(channel => channel['channel_id'] === channelId)[0]

    const {mixinsData} = useTypedSelector(state => state.mixins)
    const currentMixins = mixinsData[channel ? channel['channel_id'] : '']
    const mixinType = searchParams.get('mixin-tab') as MixinTypeStates || MixinTypeStates.in
    const reversedMixins = currentMixins && (currentMixins[mixinType] ? [...currentMixins[mixinType]] : [])
    const mixinsDataState = currentMixins.mixinsDataState

    return {reversedMixins, mixinsDataState, mixinType}
}

export function useChannelSettings() {
    function checkTabInParams() {
        if (!searchParams.get(params.tab)) {
            changeTab(tabs[0].parameterName)()
        }
    }

    function changeTab(tab: string) {
        return function () {
            changeSearchParams(
                {
                    [params.mixinTab]: searchParams.get(params.mixinTab) || MixinTypeStates.in,
                    [params.tab]: tab
                })
        }
    }

    function fetchKeys() {
        const falseStatement = !channel || (keysData[channel['channel_id']] &&
            keysData[channel['channel_id']].keysDataState === dataStates.requested)
        if (falseStatement) {
            return;
        }
        const trueStatement = !keysData[channel['channel_id']] ||
            keysData[channel['channel_id']].keysDataState === dataStates.notRequested

        if (trueStatement) {
            fetchGetKeys(channel['channel_id'])
        }
    }

    function fetchMixins() {
        const falseStatement = !channel ||
            (mixinsData[channel['channel_id']] &&
                mixinsData[channel['channel_id']].mixinsDataState === dataStates.requested)
        if (falseStatement) {
            return
        }

        const trueStatement = !mixinsData[channel['channel_id']] ||
            mixinsData[channel['channel_id']].mixinsDataState === dataStates.notRequested
        if (trueStatement) {
            fetchGetMixins(channel['channel_id'])
        }

    }

    function fetchAll() {
        fetchKeys()
        fetchMixins()
    }


    const {fetchGetMixins, fetchGetKeys, channel, lang} = useChannelSettingsBase()
    const [searchParams, changeSearchParams] = useSearchParams()

    const tabs = menuTabs({
        main: lang.ChannelSettingsMenuMainSettings,
        keys: lang.ChannelSettingsMenuKeys, mixins: lang.ChannelSettingsMenuMixins
    })


    const {keysData} = useTypedSelector(state => state.keys)
    const {mixinsData} = useTypedSelector(state => state.mixins)
    const activeTab = searchParams.get(params.tab) || ''

    return {
        activeTab, lang, changeTab, tabs, fetchAll, checkTabInParams
    }

}
