import React from 'react'
import {dataStates} from "../store/reducers/consts";
import {routes} from "../routes/routes";
import "./header.css";
import {Link} from "react-router-dom";
import {User} from "../svg/user";
import {Settings} from "../svg/settings";
import {useHeader, useUserButton} from "../hooks/elementHooks/useHeader";

function UserButton() {
    const {lang, buttonOpen, user, exit, toggleOpen} = useUserButton()
    return (
        <div className='button-container' id='user-button'>
            <div className={'user-icon header-element ' + (buttonOpen ? 'header-element-hover' : '')}
                 onClick={toggleOpen}>
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
    const {onClick, user, userDataState, lang} = useHeader()

    const {LoginButton} = lang
    const renderUserButton = userDataState === dataStates.received && user.id
    return (
        <header className="app-header">
            <Link to={routes.index} className='lithium-container'>
                <span className="lithium-label">Li</span>
                <span className="lithium-label mq-label">MQ</span>
            </Link>
            <div>
                <div className='horizontal'>
                    <Link to={routes.settings}
                          className='header-element'>
                        <div className='theme-icon'><Settings/></div>
                    </Link>

                    {
                        renderUserButton ? <UserButton/> :
                            <button className='button mini-button' onClick={onClick(routes.login)}>
                                {LoginButton}
                            </button>
                    }
                </div>
            </div>
        </header>)
}