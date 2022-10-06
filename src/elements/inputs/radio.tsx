import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
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

    const [id] = useState(String(Math.floor(Math.random() * 1000)))
    return (
        <>
            <label className='radio-container' htmlFor={id}>
                <input className='radio' id={id} type='radio' name={name} checked={checked}
                       onChange={onChange()}/>
                <span className={`custom-radio ${checked && 'radio-checked'}`}/>
                <span className='input-label'>{label}</span>

            </label>
        </>
    )
}
