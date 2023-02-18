import React, { Component } from 'react';
import Button from '../../Forms/Button';
import Input from '../../Forms/Input';

class ActivityCreator extends Component {
    render() {
        return (
            <div className='activity_creator'>
                <div className='activity_creator_box'>
                    <Input inputType='textarea' id="activity_input" name="name" placeholder="Type here.."/>
                    <Button title="Create"/>
                </div>
            </div>
        );
    }
}

export default ActivityCreator;