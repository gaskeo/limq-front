import {Input} from "../elements/inputs/input";
import React from "react";
import {Submit} from "../elements/inputs/submit";
import {Loading} from "../elements/loading/loading";
import {useCreateChannel} from "../hooks/elementHooks/useCreateChannel";


export function CreateChannel() {
    const {
        lang,
        channelName,
        changeChannelName,
        checkChannelName,
        submit,
        errors,
        errorMessage,
        requested
    } = useCreateChannel()

    const {CreateChannelButton, CreateChannelHeader, ChannelNameForm} = lang

    return (
        <div>
            <form className='app-form form-bg' onSubmit={submit}>
                <h1>{CreateChannelHeader}</h1>
                <Input state={channelName}
                       setState={changeChannelName}
                       label={ChannelNameForm}
                       type='text'
                       errorText={errors.name}
                       onChange={checkChannelName}/>
                <p className='error-text'>{errorMessage}</p>

                <Submit label={requested ? <Loading/> : CreateChannelButton}/>
            </form>
        </div>
    )
}
