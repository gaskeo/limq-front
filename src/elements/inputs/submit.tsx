import "./inputs.css";


export function Submit(props: {label: string, submit?: any}) {
    return <input type='submit' className='submit button' value={props.label}/>
}