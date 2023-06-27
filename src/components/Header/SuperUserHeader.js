import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Forms/Button';
import Api from '../Api';
import Settings from '../Settings';
import Helper from '../Helper';

class SuperUserHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            superUser:null
        }
    }
    componentDidMount(){
        this.loadSuperUser()
    }
    loadSuperUser(){
        let api = Api,that= this;
        api.userTokenKey = Settings.secondUserTokenKey;
        if(api.setUserToken()){
            api.axios().get('/me').then(res=>{
                that.setState({
                    superUser:res.data.data
                })
            })
        }
        
    }
    onAccessEixtClickHandler(event){
        let api = Api;
        api.userTokenKey = Settings.secondUserTokenKey;
        let userId = this.state.superUser.id;
        let that = this;
        that.setState({
            isLoading:true
        })
        if(api.setUserToken()){
            api.axios().post(Settings.apiUrl+'/get-token/'+userId , {device_name:Settings.device_name}).then(res=>{
                if(res.data.type === true){
                    Helper.alert(res.data.message);
                    Helper.setCookie(Settings.secondUserTokenKey,'',100);
                    Helper.setCookie(Settings.userTokenKey,res.data.data);
                    window.location = '/';
                }else{
                    Helper.alert(res.data.message,{className:'error'});
                }
                that.setState({
                    isLoading:false
                })
            })
        }
        
    }
    render() {
        let user = this.props.auth.user;
        let superUser = this.state.superUser;
        if(!this.state.superUser){
            return <></>
        }
        return (
            <div className='super_user_header'>
                <div className='container'>
                    <div className='suh_row'>
                        <div><strong>{superUser.name}</strong> logged in as: <strong>{user.name}</strong></div>
                        <div>
                            <Button title="Exit Access" onClick = {this.onAccessEixtClickHandler.bind(this)}/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return({
        auth:state.auth
    })
}
export default connect(mapStateToProps) (SuperUserHeader);