import {ChangeEvent, Dispatch, SetStateAction} from "react";
import "./inputs.css";

interface inputProps {
    label: string,
    state: string,
    setState: Dispatch<SetStateAction<string>>,
    onChange?: ((value: string) => any), type: string,
    errorText?: string,
    placeholder?: string
}

export function Input({label, onChange, setState, state, placeholder, type, errorText}: inputProps) {

    function _onChange() {
        return function (event: ChangeEvent<HTMLInputElement>) {
            setState(event.target.value)
            if (onChange) {
                onChange(event.target.value)
            }
        }
    }

    return (
        <>
            <label className='input-label'>
                {label}
                <input className='input' type={type} value={state} placeholder={placeholder}
                       onChange={_onChange()}/>
            </label>
            <p className='error-text'>{errorText && errorText}</p>
        </>
    )
}