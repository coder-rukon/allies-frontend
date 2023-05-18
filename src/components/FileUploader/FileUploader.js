import React, { Component } from 'react';
import UploadFile from './UploadFile';
import FileUploaderItem from './FileUploaderItem';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';

class FileUploader extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            mediaList:[],
            apiResponse:{}
        }
    }
    componentDidMount(){
        this.loadFiles()
    }
    loadFiles(){
        let api = Api;
        this.setState({
            mediaList:[],
            isLoading:true
        })
        api.setUserToken();
        let url = '/media/all/'+this.props.integrator_type+'/'+this.props.integrator;
        let that =this;
        api.axios().get(url).then(res=>{
            that.setState({
                isLoading:false,
                apiResponse:res.data.data,
                mediaList:res.data.data.data
            })
        })
    }
    render() {
        let fileList = this.state.mediaList;
        return (
            <div className='file_uploader_section'>
                <UploadFile integrator={this.props.integrator} afterUpload={this.loadFiles.bind(this)} integrator_type={this.props.integrator_type}/>
                {
                    this.state.isLoading ? <SimpleLoader/> : ''
                }
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