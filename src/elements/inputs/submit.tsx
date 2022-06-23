import "./inputs.css";

interface submitProps {
    label: string | JSX.Element,
    classes?: string
}

export function Submit({label, classes}: submitProps) {
    return <button type='submit' className={`submit button center ${classes}`}>{label}</button>
}