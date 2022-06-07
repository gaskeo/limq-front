import {ChangeEvent, Dispatch, SetStateAction} from "react";
import "./inputs.css";

export function Radio(props: {
    label: string,
    setData: string,
    name: string,
    checked?: boolean,
    state: string,
    setState: Dispatch<SetStateAction<string>>,
}) {
    function onChange() {
        return function (_: ChangeEvent<HTMLInputElement>) {
            props.setState(props.setData)
        }
    }

    return (
        <>
            <label className='input-label radio-container' htmlFor='radio'>
                <input className='radio' id='radio' type='radio' name='123' checked={props.checked}
                       onChange={onChange()}/>
                <span>{props.label}</span>

            </label>
        </>
    )
}