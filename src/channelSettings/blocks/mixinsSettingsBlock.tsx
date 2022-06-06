import {channel} from "../../store/reducers/channelsReducer";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {useState} from "react";
import {Menu} from "../menu";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {dataStates} from "../../store/reducers/consts";
import {fetchCreateMixin} from "../../fetch/fetchCreateMixin";
import {useDispatch} from "react-redux";
import {MixinTypeStates} from "../../store/reducers/mixinsReducer";
import {useParams} from "react-router-dom";
import {fetchDeleteMixin} from "../../fetch/fetchDeleteMixin";


function MixinCard(props: { channel: channel, mixinType: MixinTypeStates }) {
    function deleteMixin() {
        if (channelId && window.confirm('Delete key?')) {
            dispatch(fetchDeleteMixin(channelId, props.channel['channel_id'], props.mixinType) as any)
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

    function submit() {
        if (props.channel) {
            dispatch(fetchCreateMixin(props.channel['channel_id'], keyId) as any)
        }
    }

    const [keyId, changeKeyId] = useState('')
    const [activeTab, changeActiveTab] = useState(mixinTabs[0].parameterName)
    const dispatch = useDispatch()

    if (!props.isCurrent) {
        return null
    }

    return (
        <div>
            <h1 className='header-1'>Create mixin</h1>
            <form>
                <Input label='Read key' state={keyId} setState={changeKeyId} type='text' placeholder={'X'.repeat(32)}/>
                <Submit label='Submit' submit={submit}/>
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