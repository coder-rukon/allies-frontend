import React, { Component } from 'react';

class FileUploaderItem extends Component {
    render() {
        return (
            <div className='file_uploader_item'>
                <a href="/#" target='_blank' className='file_details'>
                    <span className='icon'><img src='/images/filelink.png' alt="file"/></span>
                    <span className='name'>File name</span>
                </a>
            </div>
        );
    }
}

export default FileUploaderItem;