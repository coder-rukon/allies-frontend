import React, { Component } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

class MasterLayout extends Component {
    render() {
        return (
            <div className='main_app_layout'>
                <Header {...this.props}/>
                <div className='main_contents_with_sidebar'>
                    <Sidebar  {...this.props}/>
                    <div className='master_contents'>
                        {this.props.children}
                        <div className='clearfix'></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MasterLayout;