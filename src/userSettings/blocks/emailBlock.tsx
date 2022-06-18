import React, {useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {dataStates} from "../../store/reducers/consts";
import {checkPasswordLength, confirmEmail} from "../../register/register";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {Loading} from "../../elements/loading/loading";
import {useActions} from "../../hooks/useActions";

function hideEmail(email: string) {
    if (email.length < 3) {
        return ''
    }

    const [name, fullDomain] = email.split('@')
    const [domain, zone] = fullDomain.split('.')
    const hiddenName = name.length > 2 ?
        name[0] + '*'.repeat(Math.max(0, name.length - 2)) + name[Math.min(0, name.length - 1)]
        : name
    const hiddenDomain = domain.length > 2 ?
        domain[0] + '*'.repeat(domain.length - 2) + domain[domain.length - 1]
        : domain
    return `${hiddenName}@${hiddenDomain}.${zone}`
}

export function EmailBlock() {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let newErrors = {...errors}

        newErrors.email = !confirmEmail(newEmail) ? lang.InvalidEmailError : ''
        newErrors.password = !checkPasswordLength(password) ? lang.PasswordTooShortError : ''

        changeErrors(newErrors)
        if (newErrors.email || newErrors.password) {
            return
        }

        if (user.id) {
            changeEmail(newEmail, password)
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


    const {user} = useTypedSelector(state => state.user)
    const [newEmail, changeNewEmail] = useState('')
    const [password, changePassword] = useState('')

    const {changeEmail} = useActions()

    const [errors, changeErrors] = useState({email: '', password: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const {lang} = useTypedSelector(state => state.lang)
    const changeEmailState = states[ApiRoutes.ChangeEmail]

    const requested = changeEmailState && changeEmailState.dataState === dataStates.requested
    const hasError = changeEmailState && changeEmailState.status !== 200

    const placeholder = user.email ? hideEmail(user.email) : ''
    return (
        <div>
            <form onSubmit={submit}>
                <h2 className='header-2'>{lang.ChangeEmailHeader}</h2>
                <Input label={lang.EmailForm}
                       state={newEmail}
                       setState={changeNewEmail}
                       errorText={errors.email}
                       onChange={validateEmail}
                       placeholder={placeholder}
                       type='text'/>
                <Input label={lang.PasswordForm}
                       state={password}
                       errorText={errors.password}
                       onChange={checkPassword}
                       setState={changePassword}
                       type='password'
                       placeholder={lang.EnterPassword}/>
                <p className='error-text'>{hasError && changeEmailState.message}</p>

                <Submit label={requested ? <Loading/> : lang.ChangeEmailButton}/>
            </form>
        </div>
    )
}