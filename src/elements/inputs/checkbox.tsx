import {ChangeEvent, Dispatch, SetStateAction} from "react";
import "./inputs.css";

export function Checkbox(props: {
    label: string,
    state: boolean,
    setState: Dispatch<SetStateAction<boolean>>,
    onChange?: ((value: string) => any)
}) {

    function onChange() {
        return function (event: ChangeEvent<HTMLInputElement>) {
            props.setState(event.target.checked)
            if (props.onChange) {
                props.onChange(event.target.value)
            }
        }
    }

    return (
        <>
            <label className='input-label'>
                <input type='checkbox' checked={props.state}
                       onChange={onChange()}/>
                {props.label}
            </label>
        </>
    )
}