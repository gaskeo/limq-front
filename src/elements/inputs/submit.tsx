export function Submit(props: {label: string, submit: () => void}) {
    return <input type='button' className='submit' onClick={props.submit} value={props.label}/>
}