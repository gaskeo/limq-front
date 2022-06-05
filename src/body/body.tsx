import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {RegisterBody} from "./registerBody";
import {BaseBody} from "./baseBody";
import './body.css';

export function Body() {
    const {id, userDataState} = useTypedSelector(state => state.user)

    if (userDataState === dataStates.notRequested || userDataState === dataStates.requested) {
        return <div>loading...</div>
    }

    if (userDataState === dataStates.error) {
        return <div>something went wrong...</div>
    }

    if (userDataState === dataStates.received && id) {
        return <RegisterBody/>
    }
    return <BaseBody/>
}