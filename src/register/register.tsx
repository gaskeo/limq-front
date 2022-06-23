import React from "react";
import {Input} from "../elements/inputs/input";
import {Submit} from "../elements/inputs/submit";
import {Loading} from "../elements/loading/loading";
import {useRegister} from "../hooks/elementHooks/useRegister";


export function Register() {
    const {
        lang,
        email,
        changeEmail,
        validateEmail,
        username,
        changeUsername,
        checkUsername,
        password,
        changePassword,
        checkPassword,
        passwordAgain,
        changePasswordAgain,
        checkPasswordAgain,
        submit,
        errors,
        errorMessage,
        requested
    } = useRegister()

    const {
        RegisterHeader,
        EmailForm,
        EnterEmail,
        UsernameForm,
        EnterUsername,
        PasswordForm,
        EnterPassword,
        PasswordAgainForm,
        EnterPasswordAgain,
        RegisterButton
    } = lang

    return (
        <div className='center'>
            <form className='app-form form-bg' onSubmit={submit}>
                <h1 className='header-1'>{RegisterHeader}</h1>
                <Input state={email}
                       setState={changeEmail}
                       label={EmailForm}
                       type='text'
                       errorText={errors.email}
                       onChange={validateEmail}
                       placeholder={EnterEmail}/>

                <Input state={username}
                       setState={changeUsername}
                       label={UsernameForm}
                       type='text'
                       errorText={errors.username}
                       onChange={checkUsername}
                       placeholder={EnterUsername}/>

                <Input state={password}
                       setState={changePassword}
                       label={PasswordForm}
                       type='password'
                       errorText={errors.password}
                       onChange={checkPassword}
                       placeholder={EnterPassword}/>

                <Input state={passwordAgain}
                       setState={changePasswordAgain}
                       label={PasswordAgainForm}
                       type='password'
                       errorText={errors.passwordAgain}
                       onChange={checkPasswordAgain}
                       placeholder={EnterPasswordAgain}/>
                <p className='error-text'>{errorMessage}</p>

                <Submit classes='success-button' label={requested ? <Loading/> : RegisterButton}/>
            </form>
        </div>
    )
}