import {Input} from "../elements/inputs/input";
import React from "react";
import {Submit} from "../elements/inputs/submit";
import {Loading} from "../elements/loading/loading";
import {useCreateChannel} from "../hooks/elementHooks/useCreateChannel";
import {NumericInput} from "../elements/inputs/numericInput";
import {Checkbox} from "../elements/inputs/checkbox";


export function CreateChannel() {
    const {
        lang,
        channelName,
        changeChannelName,
        checkChannelName,
        submit,
        errors,
        errorMessage,
        requested, bufferization, changeBufferization,
        maxBufferedMessageCount, bufferedDataPersistency, changeBufferedDataPersistency,
        endToEndDataEncryption, changeEndToEndDataEncryption, maxMessageSize,
        maxBufferedDataPersistency, messageSizeKb, bufferedMessageCount, changeMessageSizeKb,
        changeBufferedMessageCount, changeNotBufferMixins, notBufferMixins
    } = useCreateChannel()

    const {
        CreateChannelButton, CreateChannelHeader, ChannelNameForm, EnterChannelName,
        MaxMessageSizeForm, NeedBufferizationForm, MaxBufferedMessageCount, BufferedDataPersistencyForm,
        EndToEndDataEncryptionForm, UpToPlaceholderR, NotBufferMixins
    } = lang


    return (
        <div>
            <form className='app-form form-bg' onSubmit={submit}>
                <h1>{CreateChannelHeader}</h1>
                <Input state={channelName}
                       setState={changeChannelName}
                       label={ChannelNameForm}
                       type='text'
                       errorText={errors.name}
                       onChange={checkChannelName}
                       placeholder={EnterChannelName}/>

                <NumericInput state={messageSizeKb ? messageSizeKb : ''}
                              setState={changeMessageSizeKb}
                              label={MaxMessageSizeForm}
                              placeholder={`${UpToPlaceholderR.replace('{count}', maxMessageSize.toString())}KB`}
                              max={maxMessageSize}
                              min={1}/>

                <p className='error-text'/>

                <div className='max-width-500 align-left width-100 height-120'>
                    <Checkbox label={NeedBufferizationForm} state={bufferization} setState={changeBufferization}/>
                </div>
                <p className='error-text'/>

                <div className={`width-100 max-width-500 transition ${!bufferization && 'half-opacity'}`}>
                    <NumericInput state={bufferedMessageCount}
                                  setState={changeBufferedMessageCount}
                                  label={MaxBufferedMessageCount}
                                  placeholder={UpToPlaceholderR.replace('{count}', maxBufferedMessageCount.toString())}
                                  active={bufferization}
                                  max={maxBufferedMessageCount}
                                  min={1}/>

                    <NumericInput state={bufferedDataPersistency}
                                  setState={changeBufferedDataPersistency}
                                  label={BufferedDataPersistencyForm}
                                  placeholder={UpToPlaceholderR.replace('{count}', maxBufferedDataPersistency.toString())}
                                  active={bufferization}
                                  max={maxBufferedDataPersistency}
                                  min={1}/>
                </div>

                <p className='error-text'/>

                <div className='max-width-500 align-left width-100 height-120'>
                    <Checkbox label={NotBufferMixins} state={notBufferMixins && bufferization}
                              setState={changeNotBufferMixins}
                              active={bufferization}/>
                </div>
                <p className='error-text'/>

                <div
                    className='max-width-500 align-left width-100 height-120 half-opacity horizontal na-cursor no-display'>
                    <Checkbox label={EndToEndDataEncryptionForm} state={endToEndDataEncryption && false} active={false}
                              setState={changeEndToEndDataEncryption}/>
                </div>
                <p className='error-text'>{errorMessage}</p>

                <Submit classes='success-button' label={requested ? <Loading/> : CreateChannelButton}/>
            </form>
        </div>
    )
}
