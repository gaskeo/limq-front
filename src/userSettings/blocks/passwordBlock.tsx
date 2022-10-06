import React from "react";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {Loading} from "../../elements/loading/loading";
import {usePasswordSettingsBlock} from "../../hooks/elementHooks/useUserSettings";


export function PasswordBlock() {
    const {
        lang,
        oldPassword,
        changeOldPassword,
        checkOldPassword,
        newPassword,
        changeNewPassword,
        checkNewPassword,
        newPasswordAgain,
        changeNewPasswordAgain,
        checkNewPasswordAgain,
        submit,
        errors,
        errorMessage,
        requested
    } = usePasswordSettingsBlock()

    const {
        ChangePasswordHeader,
        OldPasswordForm,
        EnterOldPassword,
        NewPasswordForm,
        EnterNewPassword,
        PasswordAgainForm,
        EnterNewPasswordAgain,
        ChangePasswordButton,
    } = lang

    return (
        <div>
            <form onSubmit={submit} className='app-form form-bg align-left auto-width'>
                <h2>{ChangePasswordHeader}</h2>

                <Input label={OldPasswordForm}
                       state={oldPassword}
                       setState={changeOldPassword}
                       type='password'
                       onChange={checkOldPassword}
                       errorText={errors.oldPassword}
                       placeholder={EnterOldPassword}/>
                <Input label={NewPasswordForm}
                       state={newPassword}
                       setState={changeNewPassword}
                       type='password'
                       onChange={checkNewPassword}
                       errorText={errors.newPassword}
                       placeholder={EnterNewPassword}/>
                <Input label={PasswordAgainForm}
                       state={newPasswordAgain}
                       setState={changeNewPasswordAgain}
                       onChange={checkNewPasswordAgain}
                       errorText={errors.newPasswordAgain}
                       type='password'
                       placeholder={EnterNewPasswordAgain}
                />
                <p className='error-text'>{errorMessage}</p>

                <Submit label={requested ? <Loading/> : ChangePasswordButton}/>
            </form>
        </div>
    )
}
