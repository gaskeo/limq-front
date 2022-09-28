import {Input} from "../../elements/inputs/input";
import React, {memo} from "react";
import {Submit} from "../../elements/inputs/submit";
import {Loading} from "../../elements/loading/loading";
import {useMainSettingsBlock} from "../../hooks/elementHooks/useChannelSettings";


export const MainSettingsBlock = memo(() => {
    const {
        lang,
        channelName,
        changeChannelName,
        checkChannelName,
        placeholder,
        submit,
        errors,
        requested,
        errorMessage
    } = useMainSettingsBlock()

    const {RenameChannelHeader, ChannelNameForm, RenameChannelButton} = lang

    return (
        <div>
            <form onSubmit={submit} className='app-form form-bg align-left'>
                <h2>{RenameChannelHeader}</h2>

                <Input state={channelName}
                       setState={changeChannelName}
                       label={ChannelNameForm}
                       type='text'
                       errorText={errors.name}
                       onChange={checkChannelName}
                       placeholder={placeholder}/>
                <p className='error-text'>{errorMessage}</p>

                <Submit label={requested ? <Loading/> : RenameChannelButton}/>
            </form>
        </div>
    )
})
