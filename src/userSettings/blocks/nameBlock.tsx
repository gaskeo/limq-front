import React, {useState} from "react";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {dataStates} from "../../store/reducers/consts";
import {checkChannelLength} from "../../createChannel/createChannel";
import {ApiRoutes} from "../../store/actionCreators/apiRoutes";
import {Loading} from "../../elements/loading/loading";
import {useActions} from "../../hooks/useActions";

export function checkUsernameLength(name: string) {
    return name.length <= 32
}

export function NameBlock(props: {isCurrent: boolean}) {
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let newErrors = {...errors}
        newErrors.name = !checkChannelLength(newUsername) ? 'Username too long' : ''
        changeErrors(newErrors)
        if (newErrors.name) {
            return
        }

        if (user.id) {
            fetchRenameUser(newUsername)
        }
    }

    function checkUsername(name: string) {
        if (checkUsernameLength(name)) {
            return changeErrors({...errors, name: ''})
        }
    }

    const {user} = useTypedSelector(state => state.user)
    const [newUsername, changeNewUsername] = useState('')
    const {fetchRenameUser} = useActions()

    const [errors, changeErrors] = useState({name: ''})

    const {states} = useTypedSelector(state => state.fetch)
    const renameUserState = states[ApiRoutes.RenameUser]

    const requested = renameUserState && renameUserState.dataState === dataStates.requested
    const hasError = renameUserState && renameUserState.status !== 200

    if (!props.isCurrent) {
        return null
    }

    const placeholder = user.username ? user.username : ''
    return (
        <div>
            <h1 className='header-1'>Main settings</h1>
            <form onSubmit={submit}>
                <Input label='Name'
                       state={newUsername}
                       setState={changeNewUsername}
                       placeholder={placeholder}
                       errorText={errors.name}
                       onChange={checkUsername}
                       type='text'/>
                <p className='error-text'>{hasError && renameUserState.message}</p>

                <Submit label={requested ? <Loading/> : 'Rename'}/>
            </form>
        </div>
    )
}