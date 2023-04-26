import React, { Component } from 'react';
import Button from '../Forms/Button';

class UploadFile extends Component {
    render() {
        return (
            <div className='file_uploader'>
                <input type="file" />
                <Button title="Upload"/>
            </div>
        );
    }
}

export default UploadFile;