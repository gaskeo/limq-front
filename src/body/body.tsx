import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {RegisterBody} from "./registerBody";
import {BaseBody} from "./baseBody";
import {Loading} from "../elements/loading/loading";
import './body.css';
import './channelCard/card.css'

export function Body() {
    const {user, userDataState} = useTypedSelector(state => state.user)
    const {lang} = useTypedSelector(state => state.lang)

    if (userDataState === dataStates.notRequested || userDataState === dataStates.requested) {
        return <div className='center vertical-center'><Loading/></div>
    }

    if (userDataState === dataStates.error) {
        return <div>{lang.SomethingWentWrongError}</div>
    }

    if (userDataState === dataStates.received && user.id) {
        return <RegisterBody/>
    }
    return <BaseBody/>
}
