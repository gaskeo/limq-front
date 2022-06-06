import React, {useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {fetchChangeEmail} from "../../fetch/fetchChangeEmail";

function parseEmail(email: string) {
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
    function submit() {
        if (id) {
            dispatch(fetchChangeEmail(newEmail, password) as any)
            changePassword('')
        }
    }

    const {id, email} = useTypedSelector(state => state.user)
    const [newEmail, changeNewEmail] = useState('')
    const [password, changePassword] = useState('')

    const dispatch = useDispatch()

    if (!props.isCurrent) {
        return null
    }

    const placeholder = email ? parseEmail(email) : ''
    return (
        <div>
            <h1 className='header-1'>Change email</h1>
            <form>
                <Input label='Email' state={newEmail} setState={changeNewEmail} placeholder={placeholder}
                       type='text'/>
                <Input label='Password' state={password} setState={changePassword} type='password'/>
                <Submit label='Submit' submit={submit}/>
            </form>
        </div>
    )
}