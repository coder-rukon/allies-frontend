import React, { Component } from 'react';
import AccountsTabs from '../components/Accounts/AccountsTabs';
import NewAccountPopup from '../components/Accounts/NewAccountPopup';
import Api from '../components/Api';
import Button from '../components/Forms/Button';
import AlliesGrid from '../components/Grid/AlliesGrid';
import RsWithRouter from '../components/Inc/RsWithRouter';
import MasterComponent from '../components/Layout/MasterComponent';
import SimpleLoader from '../components/widget/SimpleLoader';
import Dropdown from '../components/Forms/Dropdown';
import Helper from '../components/Helper';
import Settings from '../components/Settings';

class AccountsPage extends Component {
    constructor(props){
        super(props);
        this.gridObj = null;
        this.state = {
            isLoading:false,
            status:'active',
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
        api.axios().get(url+'?status='+this.state.status).then(res => {
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
    onStatusChange(e){
        let that = this;
        this.setState({
            status:e.target.value
        },() => {
            that.loadData();
        })
    }
    changeCompanyStates(status,event){
        let idLsit = [];
        let selectedRows = this.gridObj.api.getSelectedRows();
        if(selectedRows.length <= 0){
            return;
        }
        selectedRows.forEach(company => {
            idLsit.push(company.id)
        });
        let api = Api,that = this;
        api.setUserToken();
        let data = {
            id: idLsit.toString(),
            status:status
        }
        api.axios().post('/account/chage-status',data).then(res => {
            Helper.alert(res.data.message)
            that.loadData();
        })
    }
    actionsButtons(){
        let statusOptions = [
            {label:'Active',value:'active'},
            {label:'Archive',value:'archive'},
        ]
        return(
            <div className='d-flex gap-4'>
                <div>
                    <Dropdown  options={statusOptions} name="account_status" value={this.state.status} onChange={this.onStatusChange.bind(this)}/>
                </div>
                <div>
                    <Button title="Archive"onClick={ this.changeCompanyStates.bind(this,'archive')} />
                </div>
                <div>
                    <Button title="Active" onClick={ this.changeCompanyStates.bind(this,'active')} />
                </div>
            </div>
        )
    }
    render() {
        let headerTitles  = [
            { field: "company_name", headerName:'Company name',checkboxSelection: true},
            { field: "contact_name", headerName:'Contact Name' },
            { field: "office_phone_number", headerName:'Contact Number' },
            { field: "naics_code", headerName:'NAICS Code' },
            { field: "email", headerName:'Email' },
            { field: "address", headerName:'Address' }
          ]
        let settings = {
        }
        let accountTypeId = this.props.rs_router.params.account_type_id ? this.props.rs_router.params.account_type_id : null;
        return (
            <div className="accounts_page">
                <div className='secondery_header_wraper'>
                    <div className='container'>
                        <div className='secondery_header'>
                            <div className='left_items'>
                                <AccountsTabs/>
                            </div>
                            <div className='right_items'>
                                <Button title="+ Create new company" onClick={ e => this.openCreateAccountPopup(e)} className=""/>
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.isLoading ? <SimpleLoader /> : "" }
                <div className='grid_area'>
                    <div className='container-fluid'>
                        <AlliesGrid actions_buttons = {this.actionsButtons.bind(this)} header={headerTitles} onRowClick={this.onRowClick.bind(this)} onGridReady={this.onGridReady.bind(this)} settings={settings}/>
                        {this.state.isPopupOpen ? <NewAccountPopup defaultCompanyType ={accountTypeId} onClose={ e => { this.loadData(); this.setState({isPopupOpen:false}) }}/> : '' }
                    </div>
                </div>
            </div>
        );
    }
}

export default MasterComponent( RsWithRouter(AccountsPage) );