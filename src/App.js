import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
class App extends Component {
    render() {
        return (
            <div className='main_app'>
                <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    
                </Routes>
            </div>
        );
    }
}

export default App;