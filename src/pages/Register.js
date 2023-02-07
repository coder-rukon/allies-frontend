import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Forms/Button';
import Input from '../components/Forms/Input';
import LoginRegister from '../components/Layout/LoginRegister';

class Register extends Component {
    render() {
        return (
            <LoginRegister>
                <div className='register_page'>
                    <Input label="Full Name" name="name"/>
                    <Input label="Email" inputType="Email"/>
                    <Input label="Password"  inputType="password"/>
                    <Input label="Password Confirm"  inputType="password"/>
                    <div className='d-flex btn_links'>
                        <Button title="Submit"/>
                        <Link to="/login" className='link'>Login here</Link>
                    </div>
                </div>
            </LoginRegister>
            
        );
    }
}

export default Register;