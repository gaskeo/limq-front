import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import "./inputs.css";

export function Input(props: {
    label: string,
    state: string,
    setState: Dispatch<SetStateAction<string>>,
    checkData?: ((value: string) => string), type: string,
    placeholder?: string
}) {

    function onChange() {
        return function (event: ChangeEvent<HTMLInputElement>) {
            props.setState(event.target.value)
            if (props.checkData !== undefined) {
                changeText(props.checkData(event.target.value))
            }
        }
    }

    const [text, changeText] = useState('')

    return (
        <>
            <label className='input-label'>
                {props.label}
                <input className='input' type={props.type} value={props.state} placeholder={props.placeholder}
                       onChange={onChange()}/>
            </label>
            <p className='error-text'>{text}</p>
        </>
    )
}