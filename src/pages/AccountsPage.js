import React, { Component } from 'react';
import AccountsTabs from '../components/Accounts/AccountsTabs';
import NewAccountPopup from '../components/Accounts/NewAccountPopup';
import Api from '../components/Api';
import Button from '../components/Forms/Button';
import AlliesGrid from '../components/Grid/AlliesGrid';
import RsWithRouter from '../components/Inc/RsWithRouter';
import MasterComponent from '../components/Layout/MasterComponent';
import SimpleLoader from '../components/widget/SimpleLoader';

class AccountsPage extends Component {
    constructor(props){
        super(props);
        this.gridObj = null;
        this.state = {
            isLoading:false,
            isPopupOpen:false
        }
    }
    onGridReady(grid){
        this.gridObj = grid;
        this.loadData();
    }
    loadData(){
        let accountTypeId = this.props.rs_router.params.account_type_id ? this.props.rs_router.params.account_type_id : null;
        if(accountTypeId){
            this.loadAccountByAccountType(accountTypeId)
        }else{
            this.loadAccountByAccountType('all')
        }
    }
    loadAccountByAccountType(accountTypeId){
        let api = Api;
        api.setUserToken();
        let that = this;
        this.setState({
            isLoading:true
        })
        let url = '/account/get-by-account-type/'+accountTypeId;
        if(accountTypeId === 'all'){
            url = '/account/all';
        }
        api.axios().get(url).then(res => {
            that.setState({
                isLoading:false
            })
            that.gridObj.api.setRowData(res.data.data)
        })
    }
    onRowClick(params){
        this.props.rs_router.navigate('/company/'+params.data.id+'/details');
    }
    openCreateAccountPopup(e){
        this.setState({
            isPopupOpen:true
        })
    }
    componentDidUpdate(prevProps){
        let accountTypeId = this.props.rs_router.params.account_type_id ? this.props.rs_router.params.account_type_id : null;
        if(accountTypeId && accountTypeId != prevProps.rs_router.params.account_type_id){
            this.loadAccountByAccountType(accountTypeId)
        }
    }
    render() {
        let headerTitles  = [
            { field: "company_name", headerName:'Company name' },
            { field: "contact_name", headerName:'Contact Name' },
            { field: "office_phone_number", headerName:'Office Phone Number' },
            { field: "email", headerName:'Email' },
            { field: "address", headerName:'Address' }
          ]
        console.log(this.props);
        return (
            <div className="accounts_page">
                <div className='secondery_header_wraper'>
                    <div className='container'>
                        <div className='secondery_header'>
                            <div className='left_items'>
                                <AccountsTabs/>
                            </div>
                            <div className='right_items'>
                                <Button title="+ Create new account" onClick={ e => this.openCreateAccountPopup(e)} className="primary_border"/>
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.isLoading ? <SimpleLoader /> : "" }
                <div className='grid_area'>
                    <div className='container-fluid'>
                        <AlliesGrid header={headerTitles} onRowClick={this.onRowClick.bind(this)} onGridReady={this.onGridReady.bind(this)}/>
                        {this.state.isPopupOpen ? <NewAccountPopup onClose={ e => { this.loadData(); this.setState({isPopupOpen:false}) }}/> : '' }
                    </div>
                </div>
            </div>
        );
    }
}

export default MasterComponent( RsWithRouter(AccountsPage) );