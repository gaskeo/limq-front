import "./inputs.css";


export function Submit(props: {label: string, submit: () => void}) {
    return <input type='button' className='submit button' onClick={props.submit} value={props.label}/>
}