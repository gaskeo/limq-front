import {ChangeEvent, Dispatch, SetStateAction} from "react";
import "./inputs.css";

interface checkboxProps {
    label: string,
    state: boolean,
    setState: Dispatch<SetStateAction<boolean>>,
    onChange?: (value: string) => any
}

export function Checkbox({label, onChange, state, setState}: checkboxProps) {
    function _onChange() {
        return function (event: ChangeEvent<HTMLInputElement>) {
            setState(event.target.checked)
            if (onChange) {
                onChange(event.target.value)
            }
        }
    }

    return (
        <label className='checkbox-container'>
            <input type='checkbox' checked={state}
                   onChange={_onChange()}/>
            {label}
        </label>
    )
}
