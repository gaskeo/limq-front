import React, {useEffect, useState} from 'react';
import './App.css';
import {Header} from "./header/header";
import {Login} from "./login/login";

import {
    Route,
    Routes, useLocation,
    useNavigate
} from "react-router-dom";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {dataStates} from "./store/reducers/consts";
import {fetchUser} from "./fetch/fetchUser";
import {Register} from "./register/register";
import {routes} from "./routes/routes";
import {redirect} from "./routes/redirect";
import { Body } from './body/body';
import {CreateChannel} from "./createChannel/createChannel";
import {ChannelSettings} from "./channelSettings/channelSettings";
import {fetchChannels} from "./fetch/fetchChannels";


function App() {
    function toggleTheme() {
        changeTheme(!lightTheme)
        document.documentElement.setAttribute("data-theme", lightTheme ? 'light' : 'dark');

    }
    const {id, userDataState} = useTypedSelector(state => state.user)
    const {channelsDataState} = useTypedSelector(state => state.channels)
    const {path, pathId} = useTypedSelector(state => state.path)

    const [lightTheme, changeTheme] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (userDataState === dataStates.notRequested) {
            dispatch(fetchUser() as any)
        }
    }, [userDataState])

    useEffect(() => {
        if (channelsDataState === dataStates.notRequested && userDataState === dataStates.received && id) {
            dispatch(fetchChannels() as any)
        }
    }, [userDataState, id])

    useEffect(() => {
        if (path) {
            redirect(path, navigate, location)
        }
    }, [pathId])

    return (
        <>
            <div className="App">
                <Header/>
            </div>
            <button onClick={toggleTheme}>theme</button>
            <div className={`app-body`}>
                <Routes>
                    <Route path={routes.index} element={<Body/>}/>
                    <Route path={routes.login} element={<Login/>}/>
                    <Route path={routes.register} element={<Register/>}/>
                    <Route path={routes.addChannel} element={<CreateChannel/>}/>
                    <Route path={routes.channelSettings} element={<ChannelSettings/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
