import React, {useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {fetchChangeEmail} from "../../fetch/fetchChangeEmail";
import {dataStates} from "../../store/reducers/consts";
import {checkPasswordLength, confirmEmail} from "../../register/register";
import {ApiRoutes} from "../../fetch/apiRoutes";
import {Loading} from "../../elements/loading/loading";

function hideEmail(email: string) {
    if (email.length < 3) {
        return ''
    }
    const [name, fullDomain] = email.split('@')
    const [domain, zone] = fullDomain.split('.')
    const hiddenName = name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]
    const hiddenDomain = domain[0] + '*'.repeat(domain.length - 2) + domain[domain.length - 1]
    return `${hiddenName}@${hiddenDomain}.${zone}`
}

export function EmailBlock(props: { isCurrent: boolean }) {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let newErrors = {...errors}

        newErrors.email = !confirmEmail(newEmail) ? 'Invalid email address' : ''
        newErrors.password = !checkPasswordLength(password) ? 'Password too short' : ''

        changeErrors(newErrors)
        if (newErrors.email || newErrors.password) {
            return
        }

        if (id) {
            dispatch(fetchChangeEmail(newEmail, password) as any)
            changePassword('')
        }
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


    const {id, email} = useTypedSelector(state => state.user)
    const [newEmail, changeNewEmail] = useState('')
    const [password, changePassword] = useState('')

    const dispatch = useDispatch()

    const [errors, changeErrors] = useState({email: '', password: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const changeEmail = states[ApiRoutes.ChangeEmail]

    const requested = changeEmail && changeEmail.dataState === dataStates.requested
    const hasError = changeEmail && changeEmail.status !== 200

    if (!props.isCurrent) {
        return null
    }

    const placeholder = email ? hideEmail(email) : ''
    return (
        <div>
            <h1 className='header-1'>Change email</h1>
            <form onSubmit={submit}>
                <Input label='Email'
                       state={newEmail}
                       setState={changeNewEmail}
                       errorText={errors.email}
                       onChange={validateEmail}
                       placeholder={placeholder}
                       type='text'/>
                <Input label='Password'
                       state={password}
                       errorText={errors.password}
                       onChange={checkPassword}
                       setState={changePassword}
                       type='password'/>
                <p className='error-text'>{hasError && changeEmail.message}</p>

                <Submit label={requested ? <Loading/> : 'Change Email'}/>
            </form>
        </div>
    )
}