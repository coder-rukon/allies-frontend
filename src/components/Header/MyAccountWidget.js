import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from '../Api';
import Helper from '../Helper';
import RsWithRouter from '../Inc/RsWithRouter';
import { connect } from 'react-redux';

class MyAccountWidget extends Component {
    logOut(e){
        let api = Api;
        api.setUserToken();
        let that = this;
        api.axios().get('/logout').then(res=>{
            if(res.data.status === true){
                Helper.alert(res.data.message)
                that.props.rs_router.navigate('/login')
            }
        }).catch(res => {
            console.log('error',res)
        })
        return false;
    }
    render() {
        let user = this.props.auth.user;
        return (
            <div className='dropdown_widget my_account_widthers'>
                
                <div className='dropdown_widget_controller user_thumbnail'><span>{user.name[0]}{user.name[1]}</span></div>
                <ul className='dropdown_items'>
                    <li><Link to="/my-profile">Edit Profile</Link></li>
                    <li><a href="#logout" onClick={ e => this.logOut(e) }>Log Out</a></li>
                </ul>
            </div>
        );
    }
}
const mapStateToProps = (props) =>{
    return {
        auth:props.auth
    }
}
export default connect(mapStateToProps) (RsWithRouter(MyAccountWidget));