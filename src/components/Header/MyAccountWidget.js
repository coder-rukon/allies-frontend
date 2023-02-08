import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyAccountWidget extends Component {
    render() {
        return (
            <div className='dropdown_widget my_account_widthers'>
                <div className='dropdown_widget_controller user_thumbnail'><span>SM</span></div>
                <ul className='dropdown_items'>
                    <li><Link to="/">Edit Profile</Link></li>
                    <li><Link to="/">Log Out</Link></li>
                </ul>
            </div>
        );
    }
}

export default MyAccountWidget;