import React, { Component } from 'react';
import MasterComponent from '../components/Layout/MasterComponent';
import SuperAdminOnly from '../components/Layout/SuperAdminOnly';
import SeconderyHeader from '../components/Layout/SeconderyHeader';
import AlliesGrid from '../components/Grid/AlliesGrid';
import Api from '../components/Api';
import SimpleLoader from '../components/widget/SimpleLoader';
import CustomHtmlCell from '../components/Grid/CellRenderer/CustomHtmlCell';
import Helper from '../components/Helper';
import Settings from '../components/Settings';

class Users extends Component {
    constructor(props){
        super(props);
        this.grid = null;
        this.state = {
            users:[],
            isLoading:false,
        }
    }
    componentDidMount(){
        this.loadUsers()
    }
    onGridReady(gridObj){
        this.grid = gridObj;
    }
    loadUsers(){
        let api = Api;
        api.setUserToken();
        let that = this;
        that.setState({
            isLoading:true
        })
        api.axios().get('/user/get-all').then(res => {
            that.setState({
                isLoading:false,
                users:res.data.data
            })
            that.grid.api.setRowData(res.data.data)
        })
    }
    valueFormatter(prams){
        return "Access Now"
    }
    onCellClickHandler(event){
        if(event.colDef.field =='login_now'){
            let api = Api;
            let userId = event.data.id;
            let that = this;
            that.setState({
                isLoading:true
            })
            api.axios().post(Settings.apiUrl+'/get-token/'+userId , {device_name:Settings.device_name}).then(res=>{
                if(res.data.type === true){
                    Helper.alert(res.data.message);
                    let currentUserToken = Helper.getCookie(Settings.userTokenKey);
                    Helper.setCookie(Settings.secondUserTokenKey,currentUserToken);
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
        let header = [
            {field:"name",headerName:'Full Name'},
            {field:"email",headerName:'Email'},
            {field:"role",headerName:'User Role'},
            {field:"status",headerName:'Status'},
            {field:"login_now",headerName:'', cellRenderer:CustomHtmlCell,valueFormatter:this.valueFormatter.bind(this)},
        ]
        return (
            <SuperAdminOnly>
                <SeconderyHeader>
                    <h2>All users</h2>
                </SeconderyHeader>
                <div className='container'>
                    {this.state.isLoading ?  <SimpleLoader/> : ''}
                    <AlliesGrid header={header} onCellClicked = {this.onCellClickHandler.bind(this)} onGridReady = {this.onGridReady.bind(this)}/>
                </div>
            </SuperAdminOnly>
        );
    }
}

export default MasterComponent (Users) ;