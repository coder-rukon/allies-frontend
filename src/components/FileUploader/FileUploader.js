import React, { Component } from 'react';
import UploadFile from './UploadFile';
import FileUploaderItem from './FileUploaderItem';

class FileUploader extends Component {
    render() {
        let fileList = [{},{},{},{}];

        return (
            <div className='file_uploader_section'>
                <UploadFile/>
                <div className='file_list'>
                    {
                        fileList.map((file,key) => {
                            return <FileUploaderItem file={file}/>
                        })
                    }
                </div>
                
            </div>
        );
    }
}

export default FileUploader;