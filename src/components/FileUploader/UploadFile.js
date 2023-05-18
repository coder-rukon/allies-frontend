import React, { Component } from 'react';
import Button from '../Forms/Button';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';

class UploadFile extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false
        }
    }
    clearForm(){
        let form = document.getElementById('file_form');
        form.reset()
    }
    onUpload(event){
        if(this.state.isLoading){
            return;
        }
        let formData = new FormData(document.getElementById('file_form'));
        if(this.props.integrator){
            formData.append('integrator', this.props.integrator)
            formData.append('integrator_type', this.props.integrator_type)
        }
        let api = Api;
        api.setUserToken();
        this.setState({
            isLoading:true
        })
        let that = this;
        api.axios().post('/media/create',formData).then(res => {
            if(this.props.afterUpload){
                this.props.afterUpload(res.data.data)
            }
            that.setState({
                isLoading:false
            },function(){that.clearForm();})
        }).catch(error => {
            if(this.props.afterFail){
                this.props.afterFail(error.response.data.data)
            }
            that.setState({
                isLoading:false
            },function(){that.clearForm();})
        })
    }
    render() {
        return (
            <div className='file_uploader'>
                {this.state.isLoading ? <SimpleLoader/> : ''}
                <form  id="file_form">
                    <input type="file" name="fileupload" />
                    <Button title="Upload" onClick={ e => this.onUpload(e)} type="button"/>
                </form>
                
            </div>
        );
    }
}

export default UploadFile;