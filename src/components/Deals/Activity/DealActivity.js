import React, { Component } from 'react';
import ActivityCreator from './ActivityCreator';
import ActivityList from './ActivityList';

class DealActivity extends Component {
    render() {
        return (
            <div className='deal_activity_section'>
                <ActivityCreator/>
                <ActivityList/>
            </div>
        );
    }
}

export default DealActivity;