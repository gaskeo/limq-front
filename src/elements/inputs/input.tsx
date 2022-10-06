import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import "./inputs.css";

interface inputProps {
    label: string,
    state: any,
    setState: Dispatch<SetStateAction<any>>,
    onChange?: ((value: any) => any),
    type: string,
    errorText?: string,
    placeholder?: string,
    afterInput?: React.ReactNode,
    pattern?: string,
    active?: boolean
}

export function Input({label, onChange, setState, state, placeholder, type, errorText, afterInput, pattern, active}: inputProps) {
    function _onChange() {
        return function (event: ChangeEvent<HTMLInputElement>) {
            setState(event.target.value)
            if (onChange) {
                onChange(event.target.value)
            }
        }
    }

    const inputActive = active === undefined ? true : active
    return (
        <>
            <label className='input-container'>
                <span className={`input-label ${!inputActive && 'input-label-inactive'}`}>{label}</span>
                <div className='horizontal width-100'>
                    <input className='input' disabled={!inputActive} type={type} value={state} placeholder={placeholder} pattern={pattern}
                           onChange={_onChange()}/>
                    {afterInput}
                </div>
            </label>
            <p className='error-text'>{errorText && errorText}</p>
        </>
    )
}
