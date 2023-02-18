import React, { Component } from 'react';

class ActivityListItem extends Component {
    render() {
        let activity = this.props.activity;
        return (
            <div className='activity_list_item'>
                <div className='controller'>...<div><span>Edit</span><span>Delete</span></div></div>
                <p>{activity.text}</p>
            </div>
        );
    }
}

export default ActivityListItem;