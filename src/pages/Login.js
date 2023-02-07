import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Forms/Button';
import Input from '../components/Forms/Input';
import LoginRegister from '../components/Layout/LoginRegister';

class Login extends Component {
    render() {
        return (
            <LoginRegister>
                <div className='login_page'>
                    <Input label="Email" inputType="Email"/>
                    <Input label="Password"  inputType="password"/>
                    <div className='d-flex btn_links'>
                        <Button title="Submit"/>
                        <Link to="/register" className='link'>Register here</Link>
                    </div>
                </div>
            </LoginRegister>
        );
    }
}

export default Login;