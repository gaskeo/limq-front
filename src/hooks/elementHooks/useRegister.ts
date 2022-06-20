import React, {useState} from "react";
import {useActions} from "../useActions";
import {useTypedSelector} from "../useTypedSelector";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {dataStates} from "../../store/reducers/consts";
import {getErrorDescription} from "../../lang/getServerErrorDescription";

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

export function useRegister() {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let newErrors = {...errors}

        newErrors.email = !confirmEmail(email) ? lang.InvalidEmailError : ''
        newErrors.username = !checkUsernameLength(username) ? lang.UsernameTooLongError : ''
        newErrors.password = !checkPasswordLength(password) ? lang.PasswordTooShortError : ''
        newErrors.passwordAgain = !(password === passwordAgain) ? lang.PasswordsNotMatchError : ''

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
    const errorMessage = hasError ? getErrorDescription(lang, registerState.code) : ''

    return {
        submit,
        email,
        lang,
        changeEmail,
        errors,
        validateEmail,
        username,
        changeUsername,
        checkUsername,
        password,
        changePassword, checkPassword, passwordAgain, changePasswordAgain, errorMessage, requested, checkPasswordAgain
    }
}