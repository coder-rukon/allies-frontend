import React, { Component } from 'react';

class LoginRegister extends Component {
    render() {
        return (
            <div className='login_register_page'>
                <div className='header_login_register'>
                    
                </div>
                <div className='form_box'>
                    <div className='logo_login'><img src="https://alliescommercialrealty.com/wp-content/uploads/2020/09/Allied-Commercial-Realty-Horizontal-Logo-300x103.png" alt=""/></div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LoginRegister;