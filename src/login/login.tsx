import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchLogin} from "../fetch/fetchLogin";
import {Input} from "../elements/inputs/input";
import {Submit} from "../elements/inputs/submit";
import {checkPasswordLength, confirmEmail} from "../register/register";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";

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

        dispatch(fetchLogin(email, password, true) as any)
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

    const dispatch = useDispatch()

    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('')
    const [errors, changeErrors] = useState({email: '', password: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const loginState = states['login']

    const requested = loginState && loginState.dataState === dataStates.requested
    const hasError = loginState && loginState.status !== 200

    return (
        <div className='center'>
            <form className='app-form' onSubmit={submit}>
                <Input state={email}
                       setState={changeEmail}
                       label='Email'
                       type='text'
                       errorText={errors.email}
                       onChange={validateEmail}/>

                <Input state={password}
                       setState={changePassword}
                       label='Password'
                       type='password'
                       errorText={errors.password}
                       onChange={checkPassword}/>
                <p className='error-text'>{hasError && loginState.message}</p>

                <Submit label={requested ? 'Loading...' : 'Submit'}/>
            </form>
        </div>
    )
}