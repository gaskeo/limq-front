import {useTypedSelector} from "../hooks/useTypedSelector";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchCSRF} from "../fetch_CSRF";
import {dataStates} from "../store/reducers/loginReducer";

export function Login() {
    const {csrf, csrfState} = useTypedSelector(state => state.login)
    const dispatch = useDispatch()
    useEffect(() => {
        if (csrfState === dataStates.notRequested) {
            dispatch(fetchCSRF() as any)
        }
    }, [csrfState])

    if (csrfState === dataStates.requested) {
        return <div>loading...</div>
    }

    if (csrfState === dataStates.error) {
        return <div>error...</div>
    }

    return (
        <div>
            {csrf}
        </div>
    )
}