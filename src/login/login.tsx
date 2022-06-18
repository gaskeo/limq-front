import React, {useState} from "react";
import {Input} from "../elements/inputs/input";
import {Submit} from "../elements/inputs/submit";
import {checkPasswordLength, confirmEmail} from "../register/register";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {ApiRoutes} from "../store/actionCreators/apiRoutes";
import {Checkbox} from "../elements/inputs/checkbox";
import {Loading} from "../elements/loading/loading";
import {useActions} from "../hooks/useActions";

export function Login() {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let newErrors = {...errors}

        newErrors.password = !checkPasswordLength(password) ? 'Password too short' : ''
        newErrors.email = !confirmEmail(email) ? 'Invalid email address' : ''

        changeErrors(newErrors)
        if (newErrors.email || newErrors.password) {
            return
        }

        fetchLogin(email, password, rememberMe)
        return false;
    }

    function validateEmail(email: string) {
        if (confirmEmail(email)) {
            return changeErrors({...errors, email: ''})
        }
    }

    function checkPassword(password: string) {
        if (checkPasswordLength(password)) {
            return changeErrors({...errors, password: ''})
        }
    }

    const {fetchLogin} = useActions()

    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('')
    const [rememberMe, changeRememberMe] = useState(true)
    const [errors, changeErrors] = useState({email: '', password: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const {lang} = useTypedSelector(state => state.lang)
    const loginState = states[ApiRoutes.Login]

    const requested = loginState && loginState.dataState === dataStates.requested
    const hasError = loginState && loginState.status !== 200

    return (
        <div className='center'>
            <form className='app-form form-bg' onSubmit={submit}>
                <h1 className='header-1'>{lang.LoginHeader}</h1>

                <Input state={email}
                       setState={changeEmail}
                       label={lang.EmailForm}
                       type='text'
                       errorText={errors.email}
                       onChange={validateEmail}
                       placeholder={lang.EnterEmail}
                />

                <Input state={password}
                       setState={changePassword}
                       label={lang.PasswordForm}
                       type='password'
                       errorText={errors.password}
                       onChange={checkPassword}
                       placeholder={lang.EnterPassword}/>

                <div className='width-100 max-width-500 left'><Checkbox label={lang.RememberMeForm} state={rememberMe} setState={changeRememberMe}/></div>
                <p className='error-text'>{hasError && loginState.message}</p>

                <Submit label={requested ? <Loading/> : lang.LoginButton}/>
            </form>
        </div>
    )
}