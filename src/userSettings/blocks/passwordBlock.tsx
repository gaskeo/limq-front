import {useTypedSelector} from "../../hooks/useTypedSelector";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {fetchChangePassword} from "../../fetch/fetchChangePassword";
import {dataStates} from "../../store/reducers/consts";
import {checkPasswordLength, checkPasswordsMatch} from "../../register/register";
import {ApiRoutes} from "../../fetch/apiRoutes";
import {Loading} from "../../elements/loading/loading";

export function PasswordBlock(props: { isCurrent: boolean }) {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let newErrors = {...errors}

        newErrors.oldPassword = !checkPasswordLength(oldPassword) ? 'Password too short' : ''
        newErrors.newPassword = !checkPasswordLength(newPassword) ? 'New password too short' : ''
        newErrors.newPasswordAgain = !checkPasswordsMatch(newPassword, newPasswordAgain)
            ? "Passwords don't match" : ''
        changeErrors(newErrors)
        if (newErrors.oldPassword || newErrors.newPasswordAgain || newErrors.newPasswordAgain) {
            return
        }

        if (id) {
            dispatch(fetchChangePassword(oldPassword, newPassword) as any)
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

    const {id} = useTypedSelector(state => state.user)
    const [oldPassword, changeOldPassword] = useState('')
    const [newPassword, changeNewPassword] = useState('')
    const [newPasswordAgain, changeNewPasswordAgain] = useState('')

    const dispatch = useDispatch()

    const [errors, changeErrors] = useState({oldPassword: '', newPassword: '', newPasswordAgain: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const changePasswordState = states[ApiRoutes.ChangePassword]

    const requested = changePasswordState && changePasswordState.dataState === dataStates.requested
    const hasError = changePasswordState && changePasswordState.status !== 200

    if (!props.isCurrent) {
        return null
    }

    return (
        <div>
            <h1 className='header-1'>Change password</h1>
            <form onSubmit={submit}>
                <Input label='Old password'
                       state={oldPassword}
                       setState={changeOldPassword}
                       type='password'
                       onChange={checkOldPassword}
                errorText={errors.oldPassword}/>
                <Input label='New password'
                       state={newPassword}
                       setState={changeNewPassword}
                       type='password'
                       onChange={checkPassword}
                errorText={errors.newPassword}/>
                <Input label='New password again'
                       state={newPasswordAgain}
                       setState={changeNewPasswordAgain}
                       onChange={checkPasswordAgain}
                       errorText={errors.newPasswordAgain}
                       type='password'/>
                <p className='error-text'>{hasError && changePasswordState.message}</p>

                <Submit label={requested ? <Loading/> : 'Change password'}/>
            </form>
        </div>
    )
}