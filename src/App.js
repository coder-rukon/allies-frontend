import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AccountsPage from './pages/AccountsPage';
import CompanyDetails from './pages/CompanyDetails';
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
                    <Route path="/property/:id" element={<PropertyListings />}/>
                    <Route path="/deals-pipeline/:category" element={<DealsPipleline />}/>
                    <Route path="/accounts" element={<AccountsPage />}/>
                    <Route path="/accounts/:account_type_id" element={<AccountsPage />}/>
                    <Route path="/company/:id/:page" element={<CompanyDetails />}/>
                    
                </Routes>
            </div>
        );
    }
}

export default App;