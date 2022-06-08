import "./inputs.css";


export function Submit(props: {label: string | JSX.Element, submit?: any}) {
    return <button type='submit' className='submit button center'>{props.label}</button>
}