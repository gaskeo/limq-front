import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import React, {memo} from "react";
import {Radio} from "../../elements/inputs/radio";
import {dataStates} from "../../store/reducers/consts";
import {Checkbox} from "../../elements/inputs/checkbox";
import {Loading} from "../../elements/loading/loading";
import {KeyCard} from "./keyCard/keyCard";
import {LoadingKeyCard} from "./keyCard/loadingCard";
import {useKeysSettingsBlock} from "../../hooks/elementHooks/useChannelSettings";
import {Key} from "../../store/reducers/keysReducer";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Link} from "react-router-dom";

export function checkKeyLength(key: string) {
    return key.length <= 32
}

interface KeysListProps {
    reversedKeys: Key[],
    keysDataState: dataStates.received | dataStates.requested | dataStates.notRequested | dataStates.error
}

const KeysList = memo(({reversedKeys, keysDataState}: KeysListProps) => {
    const {lang} = useTypedSelector(state => state.lang)
    if (reversedKeys.length === 0) {
        return null
    }

    const YourKeysHeader = lang.YourKeysHeader

    return (
        <div>
            <span className='gap'/>
            <div className='inline-block'>
                <h2 className='inline-block'>{YourKeysHeader}</h2>
                <div className='horizontal-gap inline-block'/>

            </div>
            <div className='gap'/>
            <div className='card-100-container'>
                {keysDataState === dataStates.requested && <LoadingKeyCard/>}
                {reversedKeys.map(key => <KeyCard key={key.key}
                                                  channelKey={key}/>)}
            </div>
            <Link to='playground' className='card-code'>{lang.TryPlayground}</Link>
        </div>
    )
})

export function KeysSettingsBlock() {
    const {
        reversedKeys,
        keysDataState,
        lang,
        keyName,
        changeKeyName,
        keyType,
        changeKeyType,
        allowInfo,
        changeAllowInfo,
        allowMixins,
        changeAllowMixins,
        submit,
        errors,
        errorMessage,
        requested
    } = useKeysSettingsBlock()

    const {
        CreateKeyHeader,
        KeyNameForm,
        EnterKeyName,
        KeyTypeReadForm,
        KeyAllowInfoForm,
        KeyAllowMixinsForm,
        KeyTypeWriteForm,
        CreateKeyButton
    } = lang

    return (
        <div>
            <form onSubmit={submit}>
                <h2>{CreateKeyHeader}</h2>
                <Input label={KeyNameForm}
                       state={keyName}
                       setState={changeKeyName}
                       type='text'
                       errorText={errors.name}
                       placeholder={EnterKeyName}/>
                <div className='channel-settings-radio-container'>
                    <div>
                        <Radio label={KeyTypeReadForm}
                               checked={keyType === '0'}
                               setData='0'
                               name='key-type'
                               setState={changeKeyType}/>

                        <div className='small-gap'/>
                        <div className='horizontal'>
                            <div className='horizontal-gap'/>
                            <div className={`${keyType === "0" ? '' : 'hidden'}`}>
                                <Checkbox label={KeyAllowInfoForm} state={allowInfo} setState={changeAllowInfo}/>
                                <Checkbox label={KeyAllowMixinsForm} state={allowMixins}
                                          setState={changeAllowMixins}/>
                            </div>
                        </div>
                        <div className='small-gap'/>
                    </div>
                    <Radio label={KeyTypeWriteForm} setData='1' name='key-type' setState={changeKeyType}
                           checked={keyType === '1'}/>
                </div>
                <p className='error-text'>{errorMessage}</p>

                <Submit label={requested ? <Loading/> : CreateKeyButton}/>
            </form>
            <KeysList reversedKeys={reversedKeys} keysDataState={keysDataState}/>
        </div>
    )
}
