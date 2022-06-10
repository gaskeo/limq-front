import React, {useState} from 'react'
import {useTypedSelector} from "../hooks/useTypedSelector";
import {dataStates} from "../store/reducers/consts";
import {routes} from "../routes/routes";
import "./header.css";
import {useDispatch} from "react-redux";
import {fetchLogout} from "../fetch/fetchLogout";
import {PathActionTypes} from "../store/reducers/pathReducer";
import {getTheme, toggleTheme} from "../theme";
import {Theme} from "../svg/theme"
import {Link} from "react-router-dom";
import {User} from "../svg/user";

function UserButton() {
    function checkOutsideClick(event: Event):any {
        if (!event.composedPath().filter((e: any) => e.id === 'user-button').length) {
            changeOpen(false)
        }
    }

    function exit() {
        return function () {
            dispatch(fetchLogout() as any)
            changeOpen(false)
            return null
        }
    }

    const {username} = useTypedSelector(state => state.user)
    const dispatch = useDispatch()
    const [buttonOpen, changeOpen] = useState(false)
    document.addEventListener("mousedown", checkOutsideClick);

    return (
        <div className='button-container' id='user-button'>
            <div className={'user-icon header-element ' + (buttonOpen ? 'header-element-hover' : '')}
                 onClick={() => changeOpen(!buttonOpen)}>
                <User/>
            </div>
            <div className={'dropdown ' + (buttonOpen ? 'show' : '')}>
                <div className='button mini-button dropdown-item no-hover'>{username}</div>
                <Link to={routes.userSettings} className='button mini-button dropdown-item'>Settings</Link>
                <button className='button mini-button dropdown-item' onClick={exit()}>Exit</button>
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

    const {id, userDataState} = useTypedSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <header className="app-header">
            <Link to={routes.index} className='lithium-container'>
                <span className="lithium-label">Lithium</span>
                <span className="lithium-label mq-label">MQ</span>
            </Link>
            <div>
                <div className='horizontal'>
                    <div onClick={toggleTheme}
                         className='header-element'><div className='theme-icon'><Theme/></div></div>
                    {userDataState === dataStates.received && id ? <UserButton/> :
                        <button className='button mini-button' onClick={onClick(routes.login)}>Login</button>}
                </div>
            </div>
        </header>)
}