import React, { Component } from 'react';

class LoginRegister extends Component {
    render() {
        return (
            <div className='login_register_page'>
                <div className='header_login_register'>
                    
                </div>
                <div className='form_box'>
                    <div className='logo_login'><img src="/images/logo.png" style={{maxWidth:'50%'}} alt=""/></div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LoginRegister;