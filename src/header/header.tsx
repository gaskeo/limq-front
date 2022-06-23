import React from 'react'
import {dataStates} from "../store/reducers/consts";
import {routes} from "../routes/routes";
import {Link} from "react-router-dom";
import {User} from "../svg/user";
import {Settings} from "../svg/settings";
import {useHeader, useUserButton} from "../hooks/elementHooks/useHeader";
import "./header.css";

function UserButton() {
    const {lang, buttonOpen, user, exit, toggleOpen} = useUserButton()

    const {SettingsButton, ExitButton} = lang

    return (
        <div className='button-container' id='user-button'>
            <div className={'user-icon header-element ' + (buttonOpen ? 'header-element-hover' : '')}
                 onClick={toggleOpen}>
                <User/>
            </div>
            <div className={'dropdown ' + (buttonOpen ? 'show' : '')}>
                <div className='button mini-button dropdown-item no-hover'>{user.username}</div>
                <Link to={routes.userSettings} className='button mini-button dropdown-item'>{SettingsButton}</Link>
                <button className='button mini-button dropdown-item' onClick={exit()}>{ExitButton}</button>
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
                <img alt='LiMQ' src={require('../svg/limq.svg').default}/>
            </Link>
            <div>
                <div className='horizontal'>
                    <Link to={routes.settings}
                          className='header-element'>
                        <div className='settings-icon'><Settings/></div>
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