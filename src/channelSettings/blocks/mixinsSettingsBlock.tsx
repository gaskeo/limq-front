import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import React, {useEffect} from "react";
import {Menu} from "../../elements/menu/menu";
import {Loading} from "../../elements/loading/loading";
import {SettingsBlock} from "../../elements/menu/settingsBlock";
import {useMixinsSettingsBlock} from "../../hooks/elementHooks/useChannelSettings";


export function MixinsSettingsBlock() {
    useEffect(() => {
        checkTabInParams()
    })

    const {
        submit,
        lang,
        keyId,
        changeKeyId,
        errors,
        checkMixin,
        errorMessage,
        requested,
        activeTab,
        changeTab,
        tabs,
        checkTabInParams
    } = useMixinsSettingsBlock()

    const {CreateMixinHeader, ReadKeyForm, EnterReadKey, CreateMixinButton, YourMixinsHeader} = lang

    return (
        <div>
            <form onSubmit={submit} className='app-form form-bg align-left auto-width'>
                <h2>{CreateMixinHeader}</h2>

                <Input state={keyId}
                       setState={changeKeyId}
                       label={ReadKeyForm}
                       type='text'
                       errorText={errors.mixin}
                       onChange={checkMixin}
                       placeholder={EnterReadKey}/>
                <p className='error-text'>{errorMessage}</p>

                <Submit label={requested ? <Loading/> : CreateMixinButton}/>
            </form>
            <span className='gap'/>
            <h2>{YourMixinsHeader}</h2>

            <div className='max-width-500'>
                <Menu active={activeTab} onClick={changeTab} tabs={tabs}
                      menuClasses='menu-horizontal' menuTabClasses='menu-tab-horizontal'/>
            </div>
            <span className='gap'/>
            <SettingsBlock currentTab={activeTab} tabs={tabs}/>
        </div>
    )
}
