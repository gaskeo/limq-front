import "./inputs.css";

interface submitProps {
    label: string | JSX.Element,
}

export function Submit({label}: submitProps) {
    return <button type='submit' className='submit button center'>{label}</button>
}