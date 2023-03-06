import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from '../components/Api';
import Button from '../components/Forms/Button';
import Input from '../components/Forms/Input';
import LoginRegister from '../components/Layout/LoginRegister';
import Settings from '../components/Settings';
import SimpleLoader from '../components/widget/SimpleLoader';
class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{},
            message:null,
            messageType:false,
            isLoading:false
        }
    }
    onChangeHanlder(e){
        let oldData = this.state.data;
        this.setState({
            data:{
                ...oldData,
                [e.target.name]:e.target.value
            }
        })
    }
    onSaveHanlder(e){
        this.setState({
            message:null,
            messageType:false,
            isLoading:true
        })
        let api = Api;
        let that = this;
        let data = this.state.data;
        api.axios().post('/register',data).then(res => {
            that.setState({
                message:res.data.message,
                messageType:res.data.status,
                isLoading:false
            })
        }).catch(error => {
            that.setState({
                isLoading:false
            })
        })
    }
    render() {
        let data = this.state.data;
        return (
            <LoginRegister>
                { this.state.isLoading ? <SimpleLoader /> : ''}
                {this.state.message ? <p>{this.state.message}</p> : ''}
                <div className='register_page'>
                    <Input label="Full Name" required={true} name="name" value={data.name} onChange={ e => this.onChangeHanlder(e)}/>
                    <Input label="Email" inputType="Email" required={true} name="email" value={data.email}  onChange={ e => this.onChangeHanlder(e)}/>
                    <Input label="Password"  inputType="password" required={true} name="password" value={data.password}  onChange={ e => this.onChangeHanlder(e)}/>
                    <Input label="Password Confirm"  inputType="password" required={true} name="password_confirmation" value={data.password_confirmation}  onChange={ e => this.onChangeHanlder(e)}/>
                    <div className='d-flex btn_links'>
                        <Button title="Submit" disable={this.state.isLoading} onClick={ e => this.onSaveHanlder(e) }/>
                        <Link to="/login" className='link'>Login here</Link>
                    </div>
                </div>
            </LoginRegister>
            
        );
    }
}

export default Register;