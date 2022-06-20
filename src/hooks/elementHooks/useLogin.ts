import React, {useState} from "react";
import {useActions} from "../useActions";
import {useTypedSelector} from "../useTypedSelector";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {dataStates} from "../../store/reducers/consts";
import {checkPasswordLength, confirmEmail} from "./useRegister";
import {getErrorDescription} from "../../lang/getServerErrorDescription";

export function useLogin() {
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
    const errorMessage = hasError ? getErrorDescription(lang, loginState.code) : ''

    return {
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
    }
}