import React, {useEffect} from 'react';
import {Header} from "./header/header";
import {Login} from "./login/login";
import {Route, Routes} from "react-router-dom";
import {Register} from "./register/register";
import {routes} from "./routes/routes";
import {Body} from './body/body';
import {CreateChannel} from "./createChannel/createChannel";
import {ChannelSettings} from "./channelSettings/channelSettings";
import {UserSettings} from "./userSettings/userSettings";
import {MainSettings} from "./settings/settings";
import {useApp} from "./hooks/elementHooks/useApp";
import './App.css';
import './helpers.css'

function App() {
    const {pathId, checkRedirect, fetchChannelsFunc, fetchUserFunc, setLang} = useApp()


    useEffect(() => {
        fetchUserFunc()
        fetchChannelsFunc()
        setLang()
    })

    useEffect(checkRedirect, [checkRedirect, pathId])

    return (
        <>
            <div className="App">
                <Header/>
            </div>
            <div className='app-body'>
                <Routes>
                    <Route path={routes.index} element={<Body/>}/>
                    <Route path={routes.login} element={<Login/>}/>
                    <Route path={routes.register} element={<Register/>}/>
                    <Route path={routes.addChannel} element={<CreateChannel/>}/>
                    <Route path={routes.channelSettings} element={<ChannelSettings/>}/>
                    <Route path={routes.userSettings} element={<UserSettings/>}/>
                    <Route path={routes.settings} element={<MainSettings/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;

