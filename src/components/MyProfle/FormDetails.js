import React, { Component } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { connect } from 'react-redux';
import Api from '../Api';
import ActionTypes from '../../actions/ActionsTypes';
import DisplayErrors from '../widget/DisplayErrors';
import Helper from '../Helper';
import SimpleLoader from '../widget/SimpleLoader';

class FormDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            errors:[],
            user:{}
        }
    }
    componentDidMount(){
        this.setState({
            user:this.props.auth.user
        })
    }
    onChangeHandler(event){
        let oldUser = this.state.user;
        this.setState({
            errors:[],
            user:{
                ...oldUser,
                [event.target.name]:event.target.value
            }
        })
    }
    onSaveHandler(e){
        this.setState({
            isLoading:true,
            errors:[]
        })
        let api = Api;
        api.setUserToken();
        let that = this;

        api.axios().post('/user/update-profile',this.state.user).then(res=> {
            if(res.data.type){
                that.setState({
                    isLoading:false,
                    errors:[],
                    user:res.data.data
                })
                Helper.alert(res.data.message)
                that.props.setUser(res.data.data)
            }else{
                that.setState({
                    isLoading:false,
                    errors:res.data.message
                })
            }
            
        })
    }
    render() {
        let user = this.state.user;
        return (
            <div className='profile_details_form'>
                <DisplayErrors errors={this.state.errors} />
                <div className='row'>
                    <Input name="name" label="Name" value={user.name} onChange={this.onChangeHandler.bind(this)} wraperClass="col-md-4"/>
                    <Input name="email" label="Email" value={user.email} onChange={this.onChangeHandler.bind(this)}   wraperClass="col-md-4"/>
                </div>
                <Button disable={this.state.isLoading} title="Save" onClick={ this.onSaveHandler.bind(this)} />
                {this.state.isLoading ? <SimpleLoader/> : ''}
            </div>
        );
    }
}
const mapStateToProps = (props) =>{
    return {
        auth:props.auth
    }
}
const mapDispatchToPrps = (dispatch) => {
    return ({
        setUser:(user) => { dispatch({type:ActionTypes.SET_USER,payload:user}) }
    })
}
export default connect(mapStateToProps,mapDispatchToPrps) (FormDetails);