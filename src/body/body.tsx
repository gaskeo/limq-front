import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {RegisterBody} from "./registerBody";
import {BaseBody} from "./baseBody";
import {Loading} from "../elements/loading/loading";
import './body.css';

export function Body() {
    const {id, userDataState} = useTypedSelector(state => state.user)

    if (userDataState === dataStates.notRequested || userDataState === dataStates.requested) {
        return <div className='center vertical-center'><Loading/></div>
    }

    if (userDataState === dataStates.error) {
        return <div>something went wrong...</div>
    }

    if (userDataState === dataStates.received && id) {
        return <RegisterBody/>
    }
    return <BaseBody/>
}