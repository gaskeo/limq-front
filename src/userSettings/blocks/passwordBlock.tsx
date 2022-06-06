import {useTypedSelector} from "../../hooks/useTypedSelector";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {fetchChangePassword} from "../../fetch/fetchChangePassword";

export function PasswordBlock(props: {isCurrent: boolean}) {
    function submit() {
        if (id && checkPasswordsMatch(newPasswordAgain).length === 0 && checkPasswordLength(oldPassword).length === 0) {
            dispatch(fetchChangePassword(oldPassword, newPassword) as any)
        }
    }

    function checkPasswordsMatch(newPasswordAgainForm: string) {
        if (newPasswordAgainForm !== newPassword) {
            return "Passwords do not match"
        }
        return ""
    }

    function checkPasswordLength(password: string) {
        if (password.length < 8) {
            return "minimum 8 symbols"
        }
        return ""
    }

    const {id} = useTypedSelector(state => state.user)
    const [oldPassword, changeOldPassword] = useState('')
    const [newPassword, changeNewPassword] = useState('')
    const [newPasswordAgain, changeNewPasswordAgain] = useState('')

    const dispatch = useDispatch()

    if (!props.isCurrent) {
        return null
    }

    return (
        <div>
            <h1 className='header-1'>Change email</h1>
            <form>
                <Input label='Old password' state={oldPassword} setState={changeOldPassword} type='password'
                       checkData={checkPasswordLength}/>
                <Input label='New password' state={newPassword} setState={changeNewPassword} type='password'/>
                <Input label='New password again' state={newPasswordAgain} setState={changeNewPasswordAgain}
                       checkData={checkPasswordsMatch}
                       type='password'/>

                <Submit label='Submit' submit={submit}/>
            </form>
        </div>
    )
}