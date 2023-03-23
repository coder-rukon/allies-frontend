import React, { Component } from 'react';
import Button from '../Forms/Button';

class CreateProperty extends Component {
    render() {
        return (
            <div className='property_create_page'>
                <div className='secondery_header_wraper'>
                    <div className='container'>
                        <div className='secondery_header'>
                            <Button to={'/property/all'} title="View All Property" className="primary_border"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateProperty;