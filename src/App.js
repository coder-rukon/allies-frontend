import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AccountsPage from './pages/AccountsPage';
import Contacts from './pages/Contacts';
import DealsPipleline from './pages/DealsPipleline';
import Login from './pages/Login';
import PropertyListings from './pages/PropertyListings';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
class App extends Component {
    render() {
        return (
            <div className='main_app'>
                <Routes>
                    <Route path="/" element={<Welcome />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/contacts" element={<Contacts />}/>
                    <Route path="/property" element={<PropertyListings />}/>
                    <Route path="/deals-pipeline/*" element={<DealsPipleline />}/>
                    <Route path="/accounts/*" element={<AccountsPage />}/>
                    
                </Routes>
            </div>
        );
    }
}

export default App;