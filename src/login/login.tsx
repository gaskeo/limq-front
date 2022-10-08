import React, {memo} from "react";
import {Input} from "../elements/inputs/input";
import {Submit} from "../elements/inputs/submit";
import {Checkbox} from "../elements/inputs/checkbox";
import {Loading} from "../elements/loading/loading";
import {useLogin} from "../hooks/elementHooks/useLogin";
import {routes} from "../routes/routes";
import {Link} from "react-router-dom";

export const Login = memo(function Login() {
    const {
        submit,
        lang,
        email,
        changeEmail,
        errors,
        validateEmail,
        password,
        changePassword,
        checkPassword,
        rememberMe,
        changeRememberMe,
        errorMessage,
        requested
    } = useLogin()

    const {LoginHeader, LoginButton, EmailForm, EnterEmail,
        PasswordForm, EnterPassword, RememberMeForm, HaveNotAccountForm, RegisterButton} = lang

    return (
        <div className='center'>
            <form className='app-form form-bg' onSubmit={submit}>
                <h1>{LoginHeader}</h1>

                <Input state={email}
                       setState={changeEmail}
                       label={EmailForm}
                       type='text'
                       errorText={errors.email}
                       onChange={validateEmail}
                       placeholder={EnterEmail}
                />

                <Input state={password}
                       setState={changePassword}
                       label={PasswordForm}
                       type='password'
                       errorText={errors.password}
                       onChange={checkPassword}
                       placeholder={EnterPassword}/>

                <div className='width-100 max-width-500 left'>
                    <Checkbox label={RememberMeForm} state={rememberMe}
                              setState={changeRememberMe}/>
                </div>
                <p className='error-text'>{errorMessage}</p>

                <Submit classes='success-button' label={requested ? <Loading/> : LoginButton}/>
                <div className='gap'/>
                <span className='text'>{HaveNotAccountForm} <Link className='link' to={routes.register}>{RegisterButton}</Link></span>
            </form>
        </div>
    )
})
