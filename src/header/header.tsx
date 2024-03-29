import React from 'react'
import {dataStates} from "../store/reducers/consts";
import {routes} from "../routes/routes";
import {Link, useLocation} from "react-router-dom";
import {User} from "../svg/user";
import {Settings} from "../svg/settings";
import {useHeader, useUserButton} from "../hooks/elementHooks/useHeader";
import "./header.css";

function UserButton() {
    const {lang, buttonOpen, user, exit, toggleOpen} = useUserButton()

    const {SettingsButton, ExitButton} = lang

    return (
        <div className='button-container' id='user-button'>
            <div className={`user-icon header-element ${buttonOpen ? 'header-element-hover' : ''}`}
                 onClick={toggleOpen}>
                <User/>
            </div>
            <div className={`dropdown ${buttonOpen ? 'show' : ''}`}>
                <div className='button dropdown-item no-hover'>{user.username}</div>
                <Link to={routes.userSettings} className='button dropdown-item'>{SettingsButton}</Link>
                <div className='button dropdown-item' onClick={exit()}>{ExitButton}</div>
            </div>
        </div>
    )
}

function LoginOrRegisterButton({LoginButton, RegisterButton, onClick}: {
    LoginButton: string,
    RegisterButton: string, onClick: (path: string) => () => void
}) {
    const location = useLocation()
    let route, text;
    if (location.pathname !== routes.login) {
        route = routes.login
        text = LoginButton
    } else {
        route = routes.register
        text = RegisterButton
    }
    return (
        <button className='header-element' onClick={onClick(route)}>
            {text}
        </button>
    )
}

export function Header() {
    const {onClick, user, userDataState, lang, headerImage} = useHeader()

    const {LoginButton, RegisterButton} = lang
    const renderUserButton = userDataState === dataStates.received && user.id
    return (
        <header className="app-header">
            <Link to={routes.index} className='lithium-container'>
                <img alt='LiMQ' src={headerImage}/>
            </Link>
            <div>
                <div className='horizontal'>
                    <Link to={`${routes.settings}?tab=main`}
                          className='header-element'>
                        <div className='settings-icon'><Settings/></div>
                    </Link>

                    {
                        renderUserButton ?
                            <UserButton/> :
                            <LoginOrRegisterButton LoginButton={LoginButton}
                                                   RegisterButton={RegisterButton}
                                                   onClick={onClick}/>

                    }
                </div>
            </div>
        </header>)
}
