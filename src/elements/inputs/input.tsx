import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";

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
            <label>
                {props.label}
                <input className='app-input' type={props.type} value={props.state} placeholder={props.placeholder}
                       onChange={onChange()}/>
            </label>
            <p>{text}</p>
        </>
    )
}