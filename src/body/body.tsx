import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {RegisterBody} from "./registerBody";
import {BaseBody} from "./baseBody";
import './body.css';
import './channelCard/card.css'
import {LoadingScreen} from "../elements/loading/loadingScreen";

export function Body() {
    const {user, userDataState} = useTypedSelector(state => state.user)
    const {lang} = useTypedSelector(state => state.lang)

    if (userDataState === dataStates.error) {
        return <div>{lang.SomethingWentWrongError}</div>
    }

    if (userDataState === dataStates.requested) {
        return <LoadingScreen/>
    }

    if (userDataState === dataStates.received && user.id) {
        return <RegisterBody/>
    }
    return <BaseBody/>
}
