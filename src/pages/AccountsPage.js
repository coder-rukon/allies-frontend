import React, { Component } from 'react';
import AccountsTabs from '../components/Accounts/AccountsTabs';
import NewAccountPopup from '../components/Accounts/NewAccountPopup';
import Button from '../components/Forms/Button';
import AlliesGrid from '../components/Grid/AlliesGrid';
import MasterComponent from '../components/Layout/MasterComponent';

class AccountsPage extends Component {
    constructor(props){
        super(props);
        this.gridObj = null;
        this.state = {
            isPopupOpen:false
        }
    }
    onGridReady(grid){
        this.gridObj = grid;
        this.loadData();
    }
    loadData(){
        fetch("https://www.ag-grid.com/example-assets/row-data.json")
       .then(response => response.json())
       .then(data => {
         this.gridObj.api.setRowData(data);
       });
    }
    onRowClick(params){
        console.log(params)
    }
    openCreateAccountPopup(e){
        this.setState({
            isPopupOpen:true
        })
    }
    render() {
        let headerTitles  = [
            { field: "make", headerName:'Company' },
            { field: "make", headerName:'Stage' },
            { field: "make", headerName:'Product Type' },
            { field: "make", headerName:'Size' },
            { field: "make", headerName:'Address' },
            { field: "make", headerName:'Industry' },
            { field: "make", headerName:'Lease expiration' },
            { field: "make", headerName:'Partners' },
            { field: "make", headerName:'Last Comment' }
          ]
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
                <div className='grid_area'>
                    <div className='container-fluid'>
                        <AlliesGrid header={headerTitles} onRowClick={this.onRowClick.bind(this)} onGridReady={this.onGridReady.bind(this)}/>
                        {this.state.isPopupOpen ? <NewAccountPopup onClose={ e => { this.setState({isPopupOpen:false}) }}/> : '' }
                    </div>
                </div>
            </div>
        );
    }
}

export default MasterComponent(AccountsPage);