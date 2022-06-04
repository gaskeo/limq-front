import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./header/header";
import {Login} from "./login/login";

import {
    HashRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {dataStates} from "./store/reducers/userReducer";
import {fetchUser} from "./fetch/fetch_user";

function App() {
    const {userDataState} = useTypedSelector(state => state.user)

    const dispatch = useDispatch()
    useEffect(() => {
        if (userDataState === dataStates.notRequested) {
            dispatch(fetchUser() as any)
        }
    }, [userDataState])

    return (
        <Router>
            <div className="App">
                <Header/>
            </div>
            <div className='app-body'>
                <Routes>
                    <Route path='/' element={<div>123</div>}/>
                    <Route path='login' element={<Login/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
