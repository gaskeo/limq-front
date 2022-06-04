import React from 'react'
import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/userReducer";
import {useNavigate} from "react-router-dom";
import {routes} from "../routes/routes";

function UserButton() {
    const {id, username, userDataState} = useTypedSelector(state => state.user)
    const navigate = useNavigate()
    if (userDataState === dataStates.received) {
        if (id) {
            return <a>{username}</a>
        } else {
            return <button onClick={() => navigate(routes.login)}>Войти</button>
        }
    }
    return <a/>

}

export function Header() {
    return (
        <header className="app-header">
            <div className='lithium-container'>
                <span className="lithium-label">Lithium</span>
                <span className="lithium-label mq-label">MQ</span>
            </div>
            <UserButton/>
        </header>)
}