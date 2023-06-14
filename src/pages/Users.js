import React, { Component } from 'react';
import MasterComponent from '../components/Layout/MasterComponent';
import SuperAdminOnly from '../components/Layout/SuperAdminOnly';
import SeconderyHeader from '../components/Layout/SeconderyHeader';
import AlliesGrid from '../components/Grid/AlliesGrid';
import Api from '../components/Api';
import SimpleLoader from '../components/widget/SimpleLoader';

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
    render() {
        console.log(this.state.users)
        let header = [
            {field:"name",headerName:'Full Name'},
            {field:"email",headerName:'Email'},
            {field:"role",headerName:'User Role'},
            {field:"status",headerName:'Status'},
        ]
        return (
            <SuperAdminOnly>
                <SeconderyHeader>
                    <h2>All users</h2>
                </SeconderyHeader>
                <div className='container'>
                    {this.state.isLoading ?  <SimpleLoader/> : ''}
                    <AlliesGrid header={header} onGridReady = {this.onGridReady.bind(this)}/>
                </div>
            </SuperAdminOnly>
        );
    }
}

export default MasterComponent (Users) ;