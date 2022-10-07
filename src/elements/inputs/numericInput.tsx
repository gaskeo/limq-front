import {Dispatch, SetStateAction, useState} from "react";
import {Input} from "./input";

interface NumericInputProps {
    label: string,
    state: number | string,
    setState: Dispatch<SetStateAction<number>>,
    onChange?: ((value: number) => any),
    errorText?: string,
    placeholder?: string,
    max?: number,
    min?: number,
    active?: boolean
}


export function NumericInput({label, onChange, setState, state, placeholder, errorText, max, min, active}: NumericInputProps) {
    function _onChange(value: number) {
        let newValue = Number(value.toString().replace('.', ''))
        if (!newValue) {
            changeShowValue('')
            setState(0)

            return

        }
        newValue = Math.min(max ? max : newValue, Math.max(min ? min : newValue, newValue))

        if (onChange) {
            onChange(newValue)
        }
        setState(newValue)
        changeShowValue(newValue.toString())
    }

    const [showValue, changeShowValue] = useState(state.toString())
    const inputActive = active === undefined ? true : active

    const minusButtonDisabled = !inputActive || (min !== undefined && min >= state)
    const plusButtonDisabled = !inputActive || (max !== undefined && max <= state)

    const buttonsMinusPlus = (
        <>
            <button type='button' disabled={minusButtonDisabled}
                    className='button plus-minus-input-button'
                    onClick={() => _onChange(Number(state) - 1)}>−
            </button>
            <button type='button' disabled={plusButtonDisabled} className='button plus-minus-input-button'
                    onClick={() => _onChange(Number(state) + 1)}>+
            </button>
        </>
    )

    return (
        <Input label={label}
               pattern="\d*"
               onChange={_onChange}
               setState={changeShowValue}
               state={showValue}
               placeholder={placeholder}
               active={inputActive}
               type='number' errorText={errorText}
               afterInput={buttonsMinusPlus}/>
    )
}