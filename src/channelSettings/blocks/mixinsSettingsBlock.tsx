import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import React, {useEffect, useState} from "react";
import {Menu} from "../../elements/menu/menu";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {dataStates} from "../../store/reducers/consts";
import {MixinTypeStates} from "../../store/reducers/mixinsReducer";
import {Loading} from "../../elements/loading/loading";
import {LoadingMixinCard} from "./mixinCard/loadingMixinCard";
import {NoMixinsCard} from "./mixinCard/noMixinsCard";
import {MixinCard} from "./mixinCard/mixinCard";
import {useActions} from "../../hooks/useActions";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {useParams, useSearchParams} from "react-router-dom";
import {SettingsBlock} from "../../elements/menu/settingsBlock";

export function checkMixinLength(mixin: string) {
    return mixin.length === 32
}


function MixinsContainer() {
    const {mixinsData} = useTypedSelector(state => state.mixins)
    const {channels} = useTypedSelector(state => state.channels)
    const {channelId} = useParams()

    const channel = channels.filter(channel => channel['channel_id'] === channelId)[0]
    const [searchParams, _] = useSearchParams()
    const mixinType = searchParams.get('mixin-tab') as MixinTypeStates || MixinTypeStates.in

    const currentMixins = mixinsData[channel ? channel['channel_id'] : '']
    const reversedMixins = currentMixins && (currentMixins[mixinType] ? [...currentMixins[mixinType]] : [])

    if (currentMixins && currentMixins.mixinsDataState === dataStates.requested) {
        return <div className='card-container card-100-container'><LoadingMixinCard/></div>
    }
    if (currentMixins && currentMixins.mixinsDataState === dataStates.received && currentMixins[mixinType] &&
        currentMixins[mixinType].length === 0) {
        return <div className='card-container card-100-container'><NoMixinsCard mixinType={mixinType}/></div>
    }

    return <div className='card-container card-100-container'>
        {currentMixins && reversedMixins.map(channel => <MixinCard key={channel['channel_id']} channel={channel}
                                                                   mixinType={mixinType}/>)}
    </div>
}

export const mixinTabs = (names: {in: string, out: string}) =>  [
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


export function MixinsSettingsBlock() {
    useEffect(() => {
        if (!searchParams.get('mixin-tab')) {
            changeTab(tabs[0].parameterName)()
        }
    })

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
    const {channels} = useTypedSelector(state => state.channels)
    const {channelId} = useParams()

    const channel = channels.filter(channel => channel['channel_id'] === channelId)[0]

    const {fetchCreateMixin} = useActions()

    const [keyId, changeKeyId] = useState('')

    const [errors, changeErrors] = useState({mixin: ''})

    const [searchParams, changeSearchParams] = useSearchParams()

    const {states} = useTypedSelector(state => state.fetch)
    const {lang} = useTypedSelector(state => state.lang)
    const createMixinState = states[ApiRoutes.CreateMixin]
    const tabs = mixinTabs({in: lang.MixinsIn, out: lang.MixinsOut})

    const requested = createMixinState && createMixinState.dataState === dataStates.requested
    const hasError = createMixinState && createMixinState.status !== 200


    return (
        <div>
            <form onSubmit={submit}>
                <h2 className='header-2'>{lang.CreateMixinHeader}</h2>

                <Input state={keyId}
                       setState={changeKeyId}
                       label={lang.ReadKeyForm}
                       type='text'
                       errorText={errors.mixin}
                       onChange={checkMixin}
                       placeholder={lang.EnterReadKey}/>
                <p className='error-text'>{hasError && createMixinState.message}</p>

                <Submit label={requested ? <Loading/> : lang.CreateMixinButton}/>
            </form>
            <span className='gap'/>
            <h1 className='header-1'>{lang.YourMixinsHeader}</h1>

            <div className='max-width-500'>
                <Menu active={searchParams.get('mixin-tab') || MixinTypeStates.in} onClick={changeTab} tabs={tabs}
                      menuClasses='menu-horizontal' menuTabClasses='menu-tab-horizontal'/>
            </div>
            <span className='gap'/>
            <SettingsBlock currentTab={searchParams.get('mixin-tab') || ''} tabs={tabs}/>
        </div>
    )
}