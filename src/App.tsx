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
import {dataStates} from "./store/reducers/userReducer";
import {fetchUser} from "./fetch/fetch_user";
import {Register} from "./register/register";
import {routes} from "./routes/routes";
import {redirect} from "./routes/redirect";


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

    if (path) {
        if (redirect(path, navigate, location)) {
            return null
        }
    }

    return (
        <>
            <div className="App">
                <Header/>
            </div>
            <div className='app-body'>
                <Routes>
                    <Route path={routes.index} element={<div>123</div>}/>
                    <Route path={routes.login} element={<Login/>}/>
                    <Route path={routes.register} element={<Register/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
