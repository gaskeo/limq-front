import {ChangeEvent, Dispatch, SetStateAction} from "react";
import "./inputs.css";

interface radioProps {
    label: string,
    setData: string,
    name: string,
    checked?: boolean,
    setState: Dispatch<SetStateAction<string>>,
}

export function Radio({label, setState, name, setData, checked}: radioProps) {
    function onChange() {
        return function (_: ChangeEvent<HTMLInputElement>) {
            setState(setData)
        }
    }

    return (
        <>
            <label className='input-label radio-container' htmlFor='radio'>
                <input className='radio' id='radio' type='radio' name={name} checked={checked}
                       onChange={onChange()}/>
                <span>{label}</span>

            </label>
        </>
    )
}