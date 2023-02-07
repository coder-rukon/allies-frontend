import React, { Component } from 'react';
import Button from '../inc/Button';

class FormHeader extends Component {
    render() {
        return (
            <div className='rs_form_header'>
                <div className='rs_form_header_left'>

                </div>
                <div className='rs_form_header_right'>
                    <Button isActive={false} title="Cancel" />
                    <Button isActive={true} title="Save & Close" />
                </div>
            </div>
        );
    }
}

export default FormHeader;