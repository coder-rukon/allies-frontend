import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionTypes from '../../actions/ActionsTypes';
import Api from '../Api';
import Helper from '../Helper';
import Settings from '../Settings';
import SimpleLoader from '../widget/SimpleLoader';
import MasterLayout from './MasterLayout';
import { Navigate } from "react-router-dom";

const defaultDataLoad = {

}
const MasterComponent = (OuterComponent,dataLoad =defaultDataLoad) =>{
    class RsDataLoaderClass extends Component {
        constructor(props){
            super(props);
            this.state = {
                isLoading:true,
            }
        }
        componentDidMount(){
            this.loadUser();
            
        }
        loadUser(){
            let api = Api;
            if(this.props.auth.user){
                this.setState({
                    isLoading:false,
                })
                return;
            }
            let that = this;
            api.setUserToken();
            this.setState({
                isLoading:true,
            })
            api.axios().get(Settings.apiUrl+'/me',{}).then(res=>{
                that.props.setUser(res.data.data)
                that.setState({
                    isLoading:false,
                })
            }).catch(res=>{
                that.setState({
                    isLoading:false,
                })
            })
        }
        render() {
            if(this.state.isLoading){
                return <SimpleLoader/>
            }
            let auth = this.props.auth;
            if(!auth.user){
                return <Navigate to="/login"/>
            }

            return ( <MasterLayout  {...this.props}><OuterComponent {...this.props} /></MasterLayout>);
        }
    }
    
    const mapStateToProps = (state) => {
        return {
            auth:state.auth
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            setUser: (user) => { dispatch({type:ActionTypes.SET_USER, payload:user})}
        }
    }

    return connect (mapStateToProps,mapDispatchToProps) ( RsDataLoaderClass  );
}

export default MasterComponent;