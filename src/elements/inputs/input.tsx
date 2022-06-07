import {ChangeEvent, Dispatch, SetStateAction} from "react";
import "./inputs.css";

export function Input(props: {
    label: string,
    state: string,
    setState: Dispatch<SetStateAction<string>>,
    onChange?: ((value: string) => any), type: string,
    errorText?: string,
    placeholder?: string
}) {

    function onChange() {
        return function (event: ChangeEvent<HTMLInputElement>) {
            props.setState(event.target.value)
            if (props.onChange) {
                props.onChange(event.target.value)
            }
        }
    }

    return (
        <>
            <label className='input-label'>
                {props.label}
                <input className='input' type={props.type} value={props.state} placeholder={props.placeholder}
                       onChange={onChange()}/>
            </label>
            <p className='error-text'>{props.errorText && props.errorText}</p>
        </>
    )
}