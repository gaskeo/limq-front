import {useTypedSelector} from "../../hooks/useTypedSelector";
import React, {useState} from "react";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {dataStates} from "../../store/reducers/consts";
import {checkPasswordLength, checkPasswordsMatch} from "../../register/register";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {Loading} from "../../elements/loading/loading";
import {useActions} from "../../hooks/useActions";


export function PasswordBlock() {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let newErrors = {...errors}

        newErrors.oldPassword = !checkPasswordLength(oldPassword) ? lang.PasswordTooShortError : ''
        newErrors.newPassword = !checkPasswordLength(newPassword) ? lang.PasswordTooShortError : ''
        newErrors.newPasswordAgain = !checkPasswordsMatch(newPassword, newPasswordAgain)
            ? lang.PasswordsNotMatchError : ''
        changeErrors(newErrors)
        if (newErrors.oldPassword || newErrors.newPasswordAgain || newErrors.newPasswordAgain) {
            return
        }

        if (user.id) {
            fetchChangePassword(oldPassword, newPassword)
        }
    }

    function checkOldPassword(password: string) {
        if (checkPasswordLength(password)) {
            return changeErrors({...errors, oldPassword: ''})
        }
    }

    function checkPassword(password: string) {
        if (checkPasswordLength(password)) {
            return changeErrors({...errors, newPassword: ''})
        }
    }

    function checkPasswordAgain(passwordAgain: string) {
        if (checkPasswordsMatch(newPassword, passwordAgain)) {
            return changeErrors({...errors, newPasswordAgain: ''})
        }
    }

    const {user} = useTypedSelector(state => state.user)
    const [oldPassword, changeOldPassword] = useState('')
    const [newPassword, changeNewPassword] = useState('')
    const [newPasswordAgain, changeNewPasswordAgain] = useState('')

    const {fetchChangePassword} = useActions()

    const [errors, changeErrors] = useState({oldPassword: '', newPassword: '', newPasswordAgain: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const {lang} = useTypedSelector(state => state.lang)
    const changePasswordState = states[ApiRoutes.ChangePassword]

    const requested = changePasswordState && changePasswordState.dataState === dataStates.requested
    const hasError = changePasswordState && changePasswordState.status !== 200

    return (
        <div>
            <form onSubmit={submit}>
                <h2 className='header-2'>{lang.ChangePasswordHeader}</h2>

                <Input label={lang.OldPasswordForm}
                       state={oldPassword}
                       setState={changeOldPassword}
                       type='password'
                       onChange={checkOldPassword}
                       errorText={errors.oldPassword}
                       placeholder={lang.EnterOldPassword}/>
                <Input label={lang.NewPasswordForm}
                       state={newPassword}
                       setState={changeNewPassword}
                       type='password'
                       onChange={checkPassword}
                       errorText={errors.newPassword}
                       placeholder={lang.EnterNewPassword}/>
                <Input label={lang.NewPasswordForm}
                       state={newPasswordAgain}
                       setState={changeNewPasswordAgain}
                       onChange={checkPasswordAgain}
                       errorText={errors.newPasswordAgain}
                       type='password'
                       placeholder={lang.EnterNewPasswordAgain}
                />
                <p className='error-text'>{hasError && changePasswordState.message}</p>

                <Submit label={requested ? <Loading/> : lang.ChangePasswordButton}/>
            </form>
        </div>
    )
}