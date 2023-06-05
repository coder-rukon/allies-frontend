import React, { Component } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';

class FormPassword extends Component {
    render() {
        return (
            <div className='profile_password_form'>
                <div className='row'>
                    <Input name="name" type="password" label="New Password" wraperClass="col-md-4"/>
                    <Input name="email"  type="password" label="Confirm Password"  wraperClass="col-md-4"/>
                </div>
                <Button title="Save" />
            </div>
        );
    }
}

export default FormPassword;