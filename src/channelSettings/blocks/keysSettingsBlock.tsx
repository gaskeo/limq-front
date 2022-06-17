import {Channel} from "../../store/reducers/channelsReducer";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import React, {useState} from "react";
import {Radio} from "../../elements/inputs/radio";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {dataStates} from "../../store/reducers/consts";
import {Checkbox} from "../../elements/inputs/checkbox";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {Loading} from "../../elements/loading/loading";
import {KeyCard} from "./keyCard/keyCard";
import {LoadingKeyCard} from "./keyCard/loadingCard";
import {useActions} from "../../hooks/useActions";

export function checkKeyLength(key: string) {
    return key.length <= 32
}

interface keysSettingsBlockProps {
    isCurrent: boolean,
    channel: Channel | undefined
}

export function KeysSettingsBlock({isCurrent, channel}: keysSettingsBlockProps) {
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

    const {fetchCreateKey} = useActions()

    const {keysData} = useTypedSelector(state => state.keys)
    const {lang} = useTypedSelector(state => state.lang)
    const currentKeys = keysData[channel ? channel['channel_id'] : '']

    const [keyName, changeKeyName] = useState('')
    const [keyType, changeKeyType] = useState('0')
    const [allowInfo, changeAllowInfo] = useState(false)
    const [errors, changeErrors] = useState({name: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const createKeyState = states[ApiRoutes.Grant]

    const requested = createKeyState && createKeyState.dataState === dataStates.requested
    const hasError = createKeyState && createKeyState.status !== 200

    const reversedKeys = currentKeys?.keys ? [...currentKeys.keys].reverse() : []

    if (!isCurrent) {
        return null
    }

    return (
        <div>
            <h1 className='header-1'>{lang.CreateKeyHeader}</h1>
            <form onSubmit={submit}>
                <Input label={lang.KeyNameForm} state={keyName} setState={changeKeyName} type='text' errorText={errors.name}/>
                <div className='channel-settings-radio-container'>
                    <div className='horizontal justify-left'>
                        <Radio label={lang.KeyTypeReadForm}
                               checked={keyType === '0'}
                               setData='0'
                               name='key-type'
                               setState={changeKeyType}/>

                            <div className='horizontal-gap'/>
                            <div className={keyType === "0" ? '' : 'hidden'}>
                                <Checkbox label={lang.KeyAllowInfoForm} state={allowInfo} setState={changeAllowInfo}/>
                            </div>

                    </div>
                    <Radio label={lang.KeyTypeWriteForm} setData='1' name='key-type' setState={changeKeyType}/>
                </div>
                <p className='error-text'>{hasError && createKeyState.message}</p>

                <Submit label={requested ? <Loading/> : lang.CreateKeyButton}/>
            </form>
            <span className='gap'/>
            <h1 className='header-1'>{lang.YourKeysHeader}</h1>

            <div className='card-100-container'>
                {currentKeys?.keysDataState === dataStates.requested && <LoadingKeyCard/>}
                {currentKeys?.keys && currentKeys.keys.length > 0 && reversedKeys.map(key => <KeyCard key={key.key}
                                                                                                          channelKey={key}/>)}
            </div>
        </div>
    )
}