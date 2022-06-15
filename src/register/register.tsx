import React, {useState} from "react";
import {Input} from "../elements/inputs/input";
import {Submit} from "../elements/inputs/submit";
import {dataStates} from "../store/reducers/consts";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {ApiRoutes} from "../store/actionCreators/apiRoutes";
import {Loading} from "../elements/loading/loading";
import {useActions} from "../hooks/useActions";

export function confirmEmail(email: string): boolean {
    if (!email.includes("@") || !email.includes(".")) {
        return false
    }
    const [name, fullDomain] = email.split("@")
    if (!fullDomain.includes(".")) {
        return false
    }
    const [domain, zone] = fullDomain.split(".")
    return Boolean(name && domain && zone);
}

export function checkPasswordLength(password: string): boolean {
    return password.length >= 8;

}

export function checkUsernameLength(username: string): boolean {
    return username.length <= 32
}

export function checkPasswordsMatch(password: string, passwordAgain: string) {
    return password === passwordAgain
}

export function Register() {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let newErrors = {...errors}

        newErrors.email = !confirmEmail(email) ? 'Invalid email address' : ''
        newErrors.username = !checkUsernameLength(username) ? 'Username too long' : ''
        newErrors.password = !checkPasswordLength(password) ? 'Password too short' : ''
        newErrors.passwordAgain = !(password === passwordAgain) ? "Passwords don't match" : ''

        changeErrors(newErrors)
        if (newErrors.email || newErrors.username || newErrors.password || newErrors.passwordAgain) {
            return
        }
        fetchRegister(email, username, password)
        return false;
    }

    function checkPassword(password: string) {
        if (checkPasswordLength(password)) {
            return changeErrors({...errors, password: ''})
        }
    }

    function validateEmail(email: string) {
        if (confirmEmail(email)) {
            return changeErrors({...errors, email: ''})
        }
    }

    function checkUsername(username: string) {
        if (checkUsernameLength(username)) {
            return changeErrors({...errors, username: ''})
        }
    }

    function checkPasswordAgain(passwordAgain: string) {
        if (checkPasswordsMatch(password, passwordAgain)) {
            return changeErrors({...errors, passwordAgain: ''})
        }
    }

    const {fetchRegister} = useActions()

    const [email, changeEmail] = useState('');
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('')
    const [passwordAgain, changePasswordAgain] = useState('')
    const [errors, changeErrors] = useState({email: '', password: '', username: '', passwordAgain: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const {lang} = useTypedSelector(state => state.lang)
    const registerState = states[ApiRoutes.Register]

    const requested = registerState && registerState.dataState === dataStates.requested
    const hasError = registerState && registerState.status !== 200

    return (
        <div className='center'>
            <form className='app-form' onSubmit={submit}>
                <Input state={email}
                       setState={changeEmail}
                       label={lang.EmailForm}
                       type='text'
                       errorText={errors.email}
                       onChange={validateEmail}/>

                <Input state={username}
                       setState={changeUsername}
                       label={lang.UsernameForm}
                       type='text'
                       errorText={errors.username}
                       onChange={checkUsername}/>

                <Input state={password}
                       setState={changePassword}
                       label={lang.PasswordForm}
                       type='password'
                       errorText={errors.password}
                       onChange={checkPassword}/>

                <Input state={passwordAgain}
                       setState={changePasswordAgain}
                       label={lang.PasswordAgainForm}
                       type='password'
                       errorText={errors.passwordAgain}
                       onChange={checkPasswordAgain}/>
                <p className='error-text'>{hasError && registerState.message}</p>

                <Submit label={requested ? <Loading/> : lang.RegisterButton}/>
            </form>
        </div>
    )
}