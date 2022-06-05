import React, {useEffect} from 'react';
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


function App() {
    const {userDataState} = useTypedSelector(state => state.user)
    const {path} = useTypedSelector(state => state.path)

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (userDataState === dataStates.notRequested) {
            dispatch(fetchUser() as any)
        }
    }, [userDataState])

    useEffect(() => {
        if (path) {
            redirect(path, navigate, location)
        }
    }, [path])


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
                </Routes>
            </div>
        </>
    );
}

export default App;
