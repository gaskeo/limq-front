import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./header/header";
import {Login} from "./login/login";

import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {dataStates} from "./store/reducers/consts";
import {Register} from "./register/register";
import {routes} from "./routes/routes";
import {Redirect} from "./routes/redirect";
import {Body} from './body/body';
import {CreateChannel} from "./createChannel/createChannel";
import {ChannelSettings} from "./channelSettings/channelSettings";
import {UserSettings} from "./userSettings/userSettings";
import {FetchActionTypes} from "./store/reducers/fetchReducer";
import {useActions} from "./hooks/useActions";
import {useDispatch} from "react-redux";
import {availableLanguages, getLang, getLangDict} from "./lang/getLang";
import {LangActionTypes} from "./store/reducers/langReducer";
import {MainSettings} from "./settings/settings";

function App() {
    const {user, userDataState} = useTypedSelector(state => state.user)
    const {channelsDataState} = useTypedSelector(state => state.channels)
    const {path, pathId} = useTypedSelector(state => state.path)
    const {langCode} = useTypedSelector(state => state.lang)

    const {fetchUser, fetchChannels} = useActions()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (userDataState === dataStates.notRequested) {
            fetchUser()
        }
    })

    useEffect(() => {
        if (channelsDataState === dataStates.notRequested && userDataState === dataStates.received && user.id) {
            fetchChannels()
        }
    })

    useEffect(() => {
        if (path) {
            dispatch({type: FetchActionTypes.deleteFetches})
            Redirect(path, navigate, location)
        }
    }, [pathId])

    useEffect(() => {
        if (langCode === availableLanguages.undefined) {
            getLangDict(getLang()).then(l => {
                console.log(getLang())
                dispatch({
                    type: LangActionTypes.setLang,
                    payload: {lang: l.langDict, langCode: getLang()}
                })
            })
        }
    })

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
