import React from "react";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {Loading} from "../../elements/loading/loading";
import {useEmailSettingsBlock} from "../../hooks/elementHooks/useUserSettings";


export function EmailBlock() {
    const {
        lang,
        newEmail,
        changeNewEmail,
        validateEmail,
        placeholder,
        password,
        checkPassword,
        changePassword,
        submit,
        errors,
        errorMessage,
        requested
    } = useEmailSettingsBlock()

    const {
        ChangeEmailHeader,
        EmailForm,
        PasswordForm,
        EnterPassword,
        ChangeEmailButton
    } = lang

    return (
        <div>
            <form onSubmit={submit}>
                <h2>{ChangeEmailHeader}</h2>
                <Input label={EmailForm}
                       state={newEmail}
                       setState={changeNewEmail}
                       errorText={errors.email}
                       onChange={validateEmail}
                       placeholder={placeholder}
                       type='text'/>
                <Input label={PasswordForm}
                       state={password}
                       errorText={errors.password}
                       onChange={checkPassword}
                       setState={changePassword}
                       type='password'
                       placeholder={EnterPassword}/>
                <p className='error-text'>{errorMessage}</p>

                <Submit label={requested ? <Loading/> : ChangeEmailButton}/>
            </form>
        </div>
    )
}
