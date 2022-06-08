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

function UserButton() {
    function onClickRoute(route: string) {
        return function () {
            dispatch({type: PathActionTypes.setPath, payload: route})
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

    return (
        <div className='button-container'>
            <button className={'button mini-button ' + (buttonOpen ? 'button-opened' : '')}
                    onClick={() => changeOpen(!buttonOpen)}>{username}</button>
            <div className={'dropdown ' + (buttonOpen ? 'show' : '')}>
                <button className='button mini-button dropdown-item'
                        onClick={onClickRoute(routes.userSettings)}>Settings
                </button>
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

    const theme = getTheme()

    return (
        <header className="app-header">
            <div onClick={onClick(routes.index)} className='lithium-container'>
                <span className="lithium-label">Lithium</span>
                <span className="lithium-label mq-label">MQ</span>
            </div>
            <div>
                <div className='horizontal'>
                    <div onClick={toggleTheme}
                         className={`theme-icon theme-toggle ${theme}`}><Theme/></div>
                    <div className='horizontal-gap'/>
                    {userDataState === dataStates.received && id ? <UserButton/> :
                        <button className='button mini-button' onClick={onClick(routes.login)}>Login</button>}
                </div>
            </div>
        </header>)
}