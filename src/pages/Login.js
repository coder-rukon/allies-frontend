import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from '../components/Api';
import Button from '../components/Forms/Button';
import Input from '../components/Forms/Input';
import Helper from '../components/Helper';
import RsWithRouter from '../components/Inc/RsWithRouter';
import LoginRegister from '../components/Layout/LoginRegister';
import Settings from '../components/Settings';
import SimpleLoader from '../components/widget/SimpleLoader';

class Login extends Component {
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
        data.device_name = Settings.device_name;
        api.axios().post('/login',data).then(res => {
            if(res.data.status === true){
                Helper.alert(res.data.message);
                that.props.rs_router.navigate('/accounts')
            }
            that.setState({
                message:res.data.message,
                messageType:res.data.status,
                isLoading:false
            })
            if(res.data.status){
                Helper.setCookie(Settings.userTokenKey,res.data.token,7)
            }
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
                <div className='login_page'>
                    <Input label="Email" inputType="Email"  required={true} name="email" value={data.email} onChange={ e => this.onChangeHanlder(e)}/>
                    <Input label="Password"  inputType="password"  required={true} name="password" value={data.password} onChange={ e => this.onChangeHanlder(e)}/>
                    <div className='d-flex btn_links'>
                        <Button title="Submit" disable={this.state.isLoading} onClick={ e => this.onSaveHanlder(e) }/>
                        <Link to="/register" className='link'>Register here</Link>
                    </div>
                </div>
            </LoginRegister>
        );
    }
}

export default  RsWithRouter(Login);