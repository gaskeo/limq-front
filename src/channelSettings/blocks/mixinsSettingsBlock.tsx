import {Channel} from "../../store/reducers/channelsReducer";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import React, {useState} from "react";
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

export function checkMixinLength(mixin: string) {
    return mixin.length === 32
}

interface mixinsContainerProps {
    isCurrent: boolean,
    channel: Channel | undefined,
    mixinType: MixinTypeStates
}

function MixinsContainer({isCurrent, mixinType, channel}: mixinsContainerProps) {
    const {mixinsData} = useTypedSelector(state => state.mixins)

    if (!isCurrent) {
        return null
    }

    const currentMixins = mixinsData[channel ? channel['channel_id'] : '']
    const reversedMixins = currentMixins && (currentMixins[mixinType] ? [...currentMixins[mixinType]] : [])

    if (currentMixins && currentMixins.mixinsDataState === dataStates.requested) {
        return <div className='card-container card-100-container'><LoadingMixinCard/></div>
    }
    if (currentMixins && currentMixins.mixinsDataState === dataStates.received &&
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
        id: 1, block: () => ((isCurrent: boolean, channel: Channel | undefined) =>
            <MixinsContainer key='1' isCurrent={isCurrent} channel={channel} mixinType={MixinTypeStates.in}/>)
    },
    {
        name: names.out, parameterName: 'keys',
        id: 2, block: () => ((isCurrent: boolean, channel: Channel | undefined) =>
            <MixinsContainer key='2' isCurrent={isCurrent} channel={channel} mixinType={MixinTypeStates.out}/>)
    },
]

interface mixinsSettingsBlockProps {
    isCurrent: boolean,
    channel: Channel | undefined,
}

export function MixinsSettingsBlock({isCurrent, channel}: mixinsSettingsBlockProps) {
    function changeTab(tab: string) {
        return function () {
            changeActiveTab(tab)
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

    const {fetchCreateMixin} = useActions()

    const [keyId, changeKeyId] = useState('')

    const [errors, changeErrors] = useState({mixin: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const {lang} = useTypedSelector(state => state.lang)
    const createMixinState = states[ApiRoutes.CreateMixin]
    const tabs = mixinTabs({in: lang.MixinsIn, out: lang.MixinsOut})
    const [activeTab, changeActiveTab] = useState(tabs[0].parameterName)

    const requested = createMixinState && createMixinState.dataState === dataStates.requested
    const hasError = createMixinState && createMixinState.status !== 200

    if (!isCurrent) {
        return null
    }

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
                <Menu active={activeTab} onClick={changeTab} tabs={tabs}
                      menuClasses='menu-horizontal' menuTabClasses='menu-tab-horizontal'/>
            </div>
            <span className='gap'/>

            {tabs.map(mixinTab => mixinTab.block()(mixinTab.parameterName === activeTab, channel))}
        </div>
    )
}