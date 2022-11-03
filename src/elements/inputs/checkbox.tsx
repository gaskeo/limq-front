import React, {Dispatch, SetStateAction} from "react";
import "./inputs.css";

interface checkboxProps {
    label: string,
    state: boolean,
    setState: Dispatch<SetStateAction<boolean>>,
    onChange?: (value: boolean) => any,
    active?: boolean
}

export function Checkbox({label, onChange, state, setState, active}: checkboxProps) {
    function _onChange() {
        return function () {
            if (!checkboxActive) return

            setState(!state)
            if (onChange) {
                onChange(!state)
            }
        }
    }

    const checkboxActive = active === undefined ? true : active

    return (
        <>
            <div className={`checkbox-container ${!checkboxActive && 'input-label-inactive half-opacity'}`} onClick={_onChange()}>
                <div className={`checkbox ${state ? 'checkbox-checked' : ''}`}/>
                <span className={`input-label ${!checkboxActive && 'input-label-inactive'}`}>{label}</span>
            </div>

        </>
    )
}
