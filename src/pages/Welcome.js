import React, { Component } from 'react';
import MasterComponent from '../components/Layout/MasterComponent';

class Welcome extends Component {
    render() {
        return (
            <div>
                Welcome to dashboard
            </div>
        );
    }
}

export default MasterComponent(Welcome);