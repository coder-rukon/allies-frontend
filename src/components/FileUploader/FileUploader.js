import React, { Component } from 'react';
import UploadFile from './UploadFile';
import FileUploaderItem from './FileUploaderItem';

class FileUploader extends Component {
    render() {
        let fileList = [{},{},{},{}];
        return (
            <div className='file_uploader'>
                <UploadFile/>
                {
                    fileList.forEach((file,key) => {
                        return <FileUploaderItem file={file}/>
                    })
                }
            </div>
        );
    }
}

export default FileUploader;