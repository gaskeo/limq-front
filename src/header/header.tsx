import React, {useState} from 'react'
import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {useNavigate} from "react-router-dom";
import {routes} from "../routes/routes";
import "./header.css";

function UserButton() {
    function onClickRoute(route: string) {
        return function () {
            navigate(route)
            changeOpen(false)
        }
    }

    function exit() {
        return function () {
            changeOpen(false)
            return null
        }
    }

    const {username} = useTypedSelector(state => state.user)
    const navigate = useNavigate()
    const [buttonOpen, changeOpen] = useState(false)

    return (
        <div className='button-container'>
            <button className={'button mini-button ' + (buttonOpen ? 'button-opened' : '')} onClick={() => changeOpen(!buttonOpen)}>{username}</button>
            <div className={'dropdown ' + (buttonOpen ? 'show' : '')}>
            <button className='button mini-button dropdown-item' onClick={onClickRoute(routes.userSettings)}>Settings</button>
            <button className='button mini-button dropdown-item' onClick={exit()}>Exit</button>
            </div>
        </div>
    )
}

export function Header() {
    function onClick(route: string) {
        return function () {
            navigate(route)
        }
    }

    const {id, userDataState} = useTypedSelector(state => state.user)
    const navigate = useNavigate()

    return (
        <header className="app-header">
            <a onClick={onClick(routes.index)} className='lithium-container'>
                <span className="lithium-label">Lithium</span>
                <span className="lithium-label mq-label">MQ</span>
            </a>
            {userDataState === dataStates.received && id ? <UserButton/> :
                <button onClick={onClick(routes.login)}>Войти</button>}
        </header>)
}