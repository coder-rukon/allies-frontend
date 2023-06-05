import React, { Component } from 'react';
import RsWithRouter from '../components/Inc/RsWithRouter';
import MasterComponent from '../components/Layout/MasterComponent';
import FormDetails from '../components/MyProfle/FormDetails';
import FormPassword from '../components/MyProfle/FormPassword';
import SeconderyHeader from '../components/Layout/SeconderyHeader';

class MyProfile extends Component {
    render() {
        return (
            <div className='my_profile_details'>
                <SeconderyHeader>
                        <h2>My Profile</h2>
                </SeconderyHeader>
                <div className='container'>
                    <h2 className='section_title'>Profile details</h2>
                    <FormDetails/>
                    <h2 className='section_title'>Change Password</h2>
                    <FormPassword/>
                </div>
            </div>
        );
    }
}

export default MasterComponent( RsWithRouter(MyProfile) );