import React, {useState} from "react";

interface selectProps {
    label: string
    items: { text: string, value: string }[]
    onChange: (value: string) => any
    selected: string,
    id: string
}

export function Select({label, items, onChange, selected, id}: selectProps) {
    function checkOutsideClick(event: Event):any {
        if (!event.composedPath().filter((e: any) => e.id === id).length) {
            changeOpen(false)
        }
    }
    const [open, changeOpen] = useState(false)
    document.addEventListener("mousedown", checkOutsideClick);

    return (
        <label className='select-label'>
            {label}
            <div className='select-container' id={id}>
                <div className={'select-element button center ' + (open ? 'select-element-open' : '')}
                     onClick={() => changeOpen(!open)}>
                    {selected && items.filter(item => item.value === selected)[0].text}
                </div>
                <div className={'select-dropdown ' + (open ? 'select-dropdown-show' : '')}>
                    {items.map(item =>
                        <div key={item.value} className={'button dropdown-item ' + (selected === item.value ? 'selected' : '')}
                             onClick={() => {
                                 changeOpen(false)
                                 onChange(item.value)
                             }}
                        >{item.text}</div>)}
                </div>
            </div>
        </label>
    )
}