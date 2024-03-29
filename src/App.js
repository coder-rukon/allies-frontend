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
import CreateNewDeal from './pages/CreateNewDeal';
import DealDetails from './pages/DealDetails';
import DealArchive from './pages/DealArchive';
import MyProfile from './pages/MyProfile';
import Users from './pages/Users';
import Settings from './pages/Settings';
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
                    <Route path="/property-details/:id" element={<PropertyListings />}/>
                    <Route path="/deals-pipeline/:category" element={<DealsPipleline />}/>
                    <Route path="/deal/new" element={<CreateNewDeal />}/>
                    <Route path="/deal-details/:id" element={<DealDetails />}/>
                    <Route path="/deal-archive" element={<DealArchive />}/>
                    <Route path="/accounts" element={<AccountsPage />}/>
                    <Route path="/accounts/:account_type_id" element={<AccountsPage />}/>
                    <Route path="/company/:id/:page" element={<CompanyDetails />}/>
                    <Route path="/my-profile" element={<MyProfile />}/>
                    <Route path="/users" element={<Users />}/>
                    <Route path="/super-admin">
                        <Route path="settings/:page" element={<Settings />}/>
                    </Route>
                    
                </Routes>
            </div>
        );
    }
}

export default App;