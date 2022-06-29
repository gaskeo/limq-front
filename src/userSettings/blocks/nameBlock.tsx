import React from "react";
import {Input} from "../../elements/inputs/input";
import {Submit} from "../../elements/inputs/submit";
import {Loading} from "../../elements/loading/loading";
import {useNameSettingsBlock} from "../../hooks/elementHooks/useUserSettings";

export function checkUsernameLength(name: string) {
    return name.length <= 32
}


export function NameBlock() {
    const {
        lang,
        newUsername,
        changeNewUsername,
        placeholder,
        checkUsername,
        submit,
        errors,
        errorMessage,
        requested
    } = useNameSettingsBlock()

    const {
        RenameUserHeader,
        UsernameForm,
        RenameUserButton
    } = lang

    return (
        <div>
            <form onSubmit={submit}>
                <h2>{RenameUserHeader}</h2>
                <Input label={UsernameForm}
                       state={newUsername}
                       setState={changeNewUsername}
                       placeholder={placeholder}
                       errorText={errors.name}
                       onChange={checkUsername}
                       type='text'/>
                <p className='error-text'>{errorMessage}</p>

                <Submit label={requested ? <Loading/> : RenameUserButton}/>
            </form>
        </div>
    )
}
