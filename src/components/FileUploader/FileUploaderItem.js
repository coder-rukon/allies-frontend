import React, { Component } from 'react';
import Settings from '../Settings';
import Button from '../Forms/Button';
import Api from '../Api';
import Helper from '../Helper';
import SimpleLoader from '../widget/SimpleLoader';

class FileUploaderItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDeleted:false,
            isLoading:false
        }
    }
    onDeleteHandler(event){
        let file = this.props.file;
        let api = Api, that = this;
        api.setUserToken();
        this.setState({
            isLoading:true
        })
        api.axios().delete('/media/delete/'+file.id).then(res => {
            Helper.alert(res.data.message)
            that.setState({
                isDeleted:true,
                isLoading:false
            })
        }).catch( error => {
            that.setState({
                isDeleted:false,
                isLoading:false
            })
        })
    }
    render() {
        let file = this.props.file;
        if(this.state.isDeleted){
            return<></>;
        }
        if(this.state.isLoading) {
            return <SimpleLoader/>
        }
        return (
            <div className='file_uploader_item'>
                <a href={Settings.apiAppUrl + '/storage/'+file.file_url} target='_blank' className='file_details'>
                    <span className='icon'><img src='/images/filelink.png' alt="file"/></span>
                    <span className='name'>{file.title}</span>
                </a>
                <Button title="Delete" onClick={  this.onDeleteHandler.bind(this) }/>
            </div>
        );
    }
}

export default FileUploaderItem;