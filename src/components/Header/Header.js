import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyAccountWidget from './MyAccountWidget';

class Header extends Component {
    render() {
        return (
            <div className='main_header_section'>
                <div className='container'>
                    <div className='header_main_row'>
                        <div className='left_section'>
                            <Link to="/" className='logo'><img src="https://alliescommercialrealty.com/wp-content/uploads/2020/09/Allied-Commercial-Realty-Horizontal-Logo-300x103.png" alt="logo"/></Link>
                        </div>
                        <div className='right_section'>
                            <ul className='main_nav'>
                                <li><Link to="/accounts"> <span className='label'>All Accounts</span><span className='icon'>0</span></Link></li>
                                <li><Link to="/tracker"> <span className='label'>Prospect Tracker</span><span className='icon'>10</span></Link></li>
                                <li><Link to="/deals-pipeline"> <span className='label'>Deal Pipeline</span><span className='icon'>150</span></Link></li>
                                <li><Link to="/clients"> <span className='label'>Clients</span><span className='icon'>150</span></Link></li>
                            </ul>
                            <div className='widgets_lists'>
                                <MyAccountWidget/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;