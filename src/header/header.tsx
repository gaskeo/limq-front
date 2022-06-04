import React from 'react'
import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/userReducer";

function UserButton() {
    const {id, username, email, userDataState} = useTypedSelector(state => state.user)
    if (userDataState === dataStates.received) {
        if (id) {
            return <a>{username}</a>
        } else {
            return <a href='/#/login'>Войти</a>
        }
    }
    return <a></a>

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