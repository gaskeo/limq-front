import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import React from "react";
import {Radio} from "../../elements/inputs/radio";
import {dataStates} from "../../store/reducers/consts";
import {Checkbox} from "../../elements/inputs/checkbox";
import {Loading} from "../../elements/loading/loading";
import {KeyCard} from "./keyCard/keyCard";
import {LoadingKeyCard} from "./keyCard/loadingCard";
import {useKeysSettingsBlock} from "../../hooks/elementHooks/useChannelSettings";

export function checkKeyLength(key: string) {
    return key.length <= 32
}

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
        disallowMixins,
        changeDisallowMixins,
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
        KeyDisallowMixinsForm,
        KeyTypeWriteForm,
        YourKeysHeader,
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
                    <div className='horizontal justify-left'>
                        <Radio label={KeyTypeReadForm}
                               checked={keyType === '0'}
                               setData='0'
                               name='key-type'
                               setState={changeKeyType}/>

                        <div className='horizontal-gap'/>
                        <div className={`horizontal ${keyType === "0" ? '' : 'hidden'}`}>
                            <Checkbox label={KeyAllowInfoForm} state={allowInfo} setState={changeAllowInfo}/>
                            <div className='horizontal-gap'/>
                            <Checkbox label={KeyDisallowMixinsForm} state={disallowMixins} setState={changeDisallowMixins}/>
                        </div>
                    </div>
                    <Radio label={KeyTypeWriteForm} setData='1' name='key-type' setState={changeKeyType}
                           checked={keyType === '1'}/>
                </div>
                <p className='error-text'>{errorMessage}</p>

                <Submit label={requested ? <Loading/> : CreateKeyButton}/>
            </form>
            {
                reversedKeys.length > 0 &&
                <div>
                    <span className='gap'/>
                    <h1>{YourKeysHeader}</h1>

                    <div className='card-100-container'>
                        {keysDataState === dataStates.requested && <LoadingKeyCard/>}
                        {reversedKeys.map(key => <KeyCard key={key.key}
                                                          channelKey={key}/>)}
                    </div>
                </div>
            }
        </div>
    )
}
