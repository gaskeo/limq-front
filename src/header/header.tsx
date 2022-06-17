import React, {useState} from 'react'
import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {routes} from "../routes/routes";
import "./header.css";
import {useDispatch} from "react-redux";
import {PathActionTypes} from "../store/reducers/pathReducer";
import {Link} from "react-router-dom";
import {User} from "../svg/user";
import {useActions} from "../hooks/useActions";
import {Settings} from "../svg/settings";

function UserButton() {
    function checkOutsideClick(event: Event):any {
        if (!event.composedPath().filter((e: any) => e.id === 'user-button').length) {
            changeOpen(false)
        }
    }

    function exit() {
        return function () {
            fetchLogout()
            changeOpen(false)
            return null
        }
    }

    const {fetchLogout} = useActions()
    const {user} = useTypedSelector(state => state.user)
    const {lang} = useTypedSelector(state => state.lang)
    const [buttonOpen, changeOpen] = useState(false)
    document.addEventListener("mousedown", checkOutsideClick);

    return (
        <div className='button-container' id='user-button'>
            <div className={'user-icon header-element ' + (buttonOpen ? 'header-element-hover' : '')}
                 onClick={() => changeOpen(!buttonOpen)}>
                <User/>
            </div>
            <div className={'dropdown ' + (buttonOpen ? 'show' : '')}>
                <div className='button mini-button dropdown-item no-hover'>{user.username}</div>
                <Link to={routes.userSettings} className='button mini-button dropdown-item'>{lang.SettingsButton}</Link>
                <button className='button mini-button dropdown-item' onClick={exit()}>{lang.ExitButton}</button>
            </div>
        </div>
    )
}

export function Header() {
    function onClick(route: string) {
        return function () {
            dispatch({type: PathActionTypes.setPath, payload: route})
        }
    }

    const {user, userDataState} = useTypedSelector(state => state.user)
    const {lang} = useTypedSelector(state => state.lang)
    const dispatch = useDispatch()

    return (
        <header className="app-header">
            <Link to={routes.index} className='lithium-container'>
                <span className="lithium-label">Li</span>
                <span className="lithium-label mq-label">MQ</span>
            </Link>
            <div>
                <div className='horizontal'>
                    <Link to={routes.settings}
                         className='header-element'><div className='theme-icon'><Settings/></div></Link>
                    {userDataState === dataStates.received && user.id ? <UserButton/> :
                        <button className='button mini-button' onClick={onClick(routes.login)}>{lang.LoginButton}</button>}
                </div>
            </div>
        </header>)
}