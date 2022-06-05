import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {RegisterBody} from "./registerBody";
import {BaseBody} from "./baseBody";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchChannels} from "../fetch/fetchChannels";
import './body.css';

export function Body() {

    const {channelsDataState} = useTypedSelector(state => state.channels)
    const {id, userDataState} = useTypedSelector(state => state.user)

    const dispatch = useDispatch()
    useEffect(() => {
        if (channelsDataState === dataStates.notRequested && userDataState === dataStates.received && id) {
            dispatch(fetchChannels() as any)
        }
    })

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