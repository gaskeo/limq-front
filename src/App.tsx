import React from 'react';
import './App.css';
import {Header} from "./header/header";
import {Login} from "./login/login";

import {
    HashRouter as Router,
    Route,
    Routes
} from "react-router-dom";

function App() {
  return (
      <Router>
    <div className="App">
      <Header/>
    </div>
          <Routes>
              <Route path='/' element={<div>123</div>}/>
              <Route path='login' element={<Login/>}/>
          </Routes>
      </Router>
  );
}

export default App;
