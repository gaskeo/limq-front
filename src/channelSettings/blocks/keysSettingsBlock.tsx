import {channel} from "../../store/reducers/channelsReducer";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Radio} from "../../elements/inputs/radio";
import {fetchCreateKey} from "../../fetch/fetchCreateKey";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {dataStates} from "../../store/reducers/consts";
import {key} from "../../store/reducers/keysReducer"
import {fetchToggleKeyActive} from "../../fetch/fetchToggleKeyActive";
import {fetchDeleteKey} from "../../fetch/fetchDeleteKey";
import {Checkbox} from "../../elements/inputs/checkbox";

export function checkKeyLength(key: string) {
    return key.length <= 32
}

function KeyCard(props: { channelKey: key }) {
    function toggleActiveKey() {
        dispatch(fetchToggleKeyActive(props.channelKey.channel, props.channelKey.key) as any)
    }

    function deleteKey() {
        if (window.confirm('Delete key?')) {
            dispatch(fetchDeleteKey(props.channelKey.channel, props.channelKey.key) as any)
        }
    }

    const perm = props.channelKey.read ? 'Read' : 'write'

    const pauseResume = props.channelKey.active ? 'Pause' : 'Resume'
    const dispatch = useDispatch()

    return (
        <div className='card card-100 horizontal-scroll'>
            <div className='card-header-container'>
                <h1 className='card-header'>{props.channelKey.name}</h1>
            </div>
            <div className='card-info-container'>
                <p className='card-text grey-text'>{perm}, {props.channelKey.created}</p>
                <code className='card-code card-background-text'>{props.channelKey.key}</code>
                <div className='card-inline-block'>
                    <button className='button mini-button warning' onClick={toggleActiveKey}>{pauseResume}</button>
                    <button className='button mini-button error' onClick={deleteKey}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export function KeysSettingsBlock(props: { isCurrent: boolean, channel: channel | undefined }) {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!props.channel) {
            return
        }

        let newErrors = {...errors}
        newErrors.name = !checkKeyLength(keyName) ? 'Key name too long' : ''
        changeErrors(newErrors)
        if (newErrors.name) {
            return
        }

        dispatch(fetchCreateKey(keyName, keyType, props.channel['channel_id'], allowInfo) as any)

    }

    const dispatch = useDispatch()

    const {keysData} = useTypedSelector(state => state.keys)
    const currentKeys = keysData[props.channel ? props.channel['channel_id'] : '']

    const [keyName, changeKeyName] = useState('')
    const [keyType, changeKeyType] = useState('0')
    const [allowInfo, changeAllowInfo] = useState(false)
    const [errors, changeErrors] = useState({name: ''})


    const {states} = useTypedSelector(state => state.fetch)
    const createKeyState = states['createKey']

    const requested = createKeyState && createKeyState.dataState === dataStates.requested
    const hasError = createKeyState && createKeyState.status !== 200

    if (!props.isCurrent) {
        return null
    }

    return (
        <div>
            <h1 className='header-1'>Create key</h1>
            <form onSubmit={submit}>
                <Input label='Name' state={keyName} setState={changeKeyName} type='text' errorText={errors.name}/>
                <div className='channel-settings-radio-container'>
                    <div className='horizontal justify-left'>
                    <Radio label='Read'
                           checked={keyType === '0'}
                           setData='0'
                           name='key-type'
                           state={keyType}
                           setState={changeKeyType}/>

                    {keyType === "0" && <>
                        <div className='horizontal-gap'/>
                        <Checkbox label='Allow info' state={allowInfo} setState={changeAllowInfo}/>
                    </>}

                    </div>
                    <Radio label='Write' setData='1' name='key-type' state={keyType} setState={changeKeyType}/>
                </div>
                <p className='error-text'>{hasError && createKeyState.message}</p>

                <Submit label={requested ? 'Loading...' : 'Submit'}/>
            </form>
            <span className='gap'/>
            <h1 className='header-1'>Your keys</h1>

            {currentKeys?.keysDataState === dataStates.requested && <div>loading...</div>}
            <div className='card-100-container'>
                {currentKeys?.keys && currentKeys.keys.length > 0 && currentKeys.keys.map(key => <KeyCard key={key.key}
                                                                                                          channelKey={key}/>)}
            </div>
        </div>
    )
}