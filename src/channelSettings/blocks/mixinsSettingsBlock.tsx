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

export const mixinTabs = [
    {
        name: 'In', parameterName: 'in',
        id: 1, block: () => ((isCurrent: boolean, channel: Channel | undefined) =>
            <MixinsContainer key='1' isCurrent={isCurrent} channel={channel} mixinType={MixinTypeStates.in}/>)
    },
    {
        name: 'Out', parameterName: 'keys',
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
        newErrors.mixin = !checkMixinLength(keyId) ? 'wrong key' : ''
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
    const [activeTab, changeActiveTab] = useState(mixinTabs[0].parameterName)

    const [errors, changeErrors] = useState({mixin: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const createMixinState = states[ApiRoutes.CreateMixin]

    const requested = createMixinState && createMixinState.dataState === dataStates.requested
    const hasError = createMixinState && createMixinState.status !== 200

    if (!isCurrent) {
        return null
    }

    return (
        <div>
            <h1 className='header-1'>Create mixin</h1>
            <form onSubmit={submit}>
                <Input state={keyId}
                       setState={changeKeyId}
                       label='Read key'
                       type='text'
                       errorText={errors.mixin}
                       onChange={checkMixin}
                       placeholder={'x'.repeat(32)}/>
                <p className='error-text'>{hasError && createMixinState.message}</p>

                <Submit label={requested ? <Loading/> : 'Create'}/>
            </form>
            <span className='gap'/>
            <h1 className='header-1'>Your mixins</h1>
            <div className='center'>
                <Menu active={activeTab} onClick={changeTab} tabs={mixinTabs}
                      menuClasses='menu-horizontal width-50' menuTabClasses='menu-tab-horizontal'/>
            </div>
            <span className='gap'/>

            {mixinTabs.map(mixinTab => mixinTab.block()(mixinTab.parameterName === activeTab, channel))}
        </div>
    )
}