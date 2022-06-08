import {channel} from "../../store/reducers/channelsReducer";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import React, {useState} from "react";
import {Menu} from "../../elements/menu/menu";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {dataStates} from "../../store/reducers/consts";
import {fetchCreateMixin} from "../../fetch/fetchCreateMixin";
import {useDispatch} from "react-redux";
import {MixinTypeStates} from "../../store/reducers/mixinsReducer";
import {useParams} from "react-router-dom";
import {fetchRestrictMixin} from "../../fetch/fetchRestrictMixin";
import {FetchActionTypes} from "../../store/reducers/fetchReducer";

export function checkMixinLength(mixin: string) {
    return mixin.length === 32
}


function MixinCard(props: { channel: channel, mixinType: MixinTypeStates }) {
    function deleteMixin() {
        if (channelId && window.confirm('Delete key?')) {
            dispatch(fetchRestrictMixin(channelId, props.channel['channel_id'], props.mixinType) as any)
        }
    }

    const {channelId} = useParams()
    const dispatch = useDispatch()

    return (
        <div className='card card-100' key={props.channel["channel_id"]}>
            <div className='card-header-container'>
                <div className='card-header'>{props.channel['channel_name']}</div>
            </div>
            <div className='card-info-container'>
                <code className='card-code card-background-text'>{props.channel['channel_id']}</code>
                <button className='button mini-button error' onClick={deleteMixin}>Delete</button>
            </div>
        </div>
    )
}

function MixinsContainer(props: { isCurrent: boolean, channel: channel | undefined, mixinType: MixinTypeStates }) {
    const {mixinsData} = useTypedSelector(state => state.mixins)

    if (!props.isCurrent) {
        return null
    }

    const currentMixins = mixinsData[props.channel ? props.channel['channel_id'] : '']

    if (currentMixins && currentMixins.mixinsDataState === dataStates.requested) {
        return <div>loading...</div>
    }
    if (currentMixins && currentMixins.mixinsDataState === dataStates.received &&
        currentMixins[props.mixinType].length === 0) {
        return <div>you haven't mixins</div>
    }

    return <div className='card-container card-100-container'>
        {currentMixins && currentMixins[props.mixinType]
            .map(channel => <MixinCard key={channel['channel_id']} channel={channel} mixinType={props.mixinType}/>)}
    </div>
}

export const mixinTabs = [
    {
        name: 'In', parameterName: 'in',
        id: 1, block: () => ((isCurrent: boolean, channel: channel | undefined) =>
            <MixinsContainer key='1' isCurrent={isCurrent} channel={channel} mixinType={MixinTypeStates.in}/>)
    },
    {
        name: 'Out', parameterName: 'keys',
        id: 2, block: () => ((isCurrent: boolean, channel: channel | undefined) =>
            <MixinsContainer key='2' isCurrent={isCurrent} channel={channel} mixinType={MixinTypeStates.out}/>)
    },
]

export function MixinsSettingsBlock(props: { isCurrent: boolean, channel: channel | undefined }) {
    function changeTab(tab: string) {
        return function () {
            changeActiveTab(tab)
        }
    }

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!props.channel) {
            return
        }

        let newErrors = {...errors}
        newErrors.mixin = !checkMixinLength(keyId) ? 'wrong key' : ''
        changeErrors(newErrors)
        if (newErrors.mixin) {
            return
        }
        if (props.channel) {
            dispatch(fetchCreateMixin(props.channel['channel_id'], keyId) as any)

        }
    }

    function checkMixin(mixin: string) {
        if (checkMixinLength(mixin)) {
            return changeErrors({...errors, mixin: ''})
        }
    }

    const dispatch = useDispatch()

    const [keyId, changeKeyId] = useState('')
    const [activeTab, changeActiveTab] = useState(mixinTabs[0].parameterName)

    const [errors, changeErrors] = useState({mixin: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const createMixinState = states[FetchActionTypes.setFetch]

    const requested = createMixinState && createMixinState.dataState === dataStates.requested
    const hasError = createMixinState && createMixinState.status !== 200

    if (!props.isCurrent) {
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

                <Submit label={requested ? 'Loading...' : 'Submit'}/>
            </form>
            <span className='gap'/>
            <h1 className='header-1'>Your mixins</h1>
            <div className='center'>
                <Menu active={activeTab} onClick={changeTab} tabs={mixinTabs}
                      menuClasses='menu-horizontal width-50' menuTabClasses='menu-tab-horizontal'/>
            </div>
            <span className='gap'/>

            {mixinTabs.map(mixinTab => mixinTab.block()(mixinTab.parameterName === activeTab, props.channel))}
        </div>
    )
}