import React, { Component } from 'react';
import Api from '../Api';
import Button from '../Forms/Button';
import AlliesGrid from '../Grid/AlliesGrid';
import SimpleLoader from '../widget/SimpleLoader';
import Helper from '../Helper';
import Dropdown from '../Forms/Dropdown';
class PropertyArchive extends Component {
    constructor(props){
        super(props);
        this.grid = null;
        this.state = {
            data:[],
            status:'available',
            isLoading:false
        }
    }
    onGridReady(grid){
        this.grid = grid;
    }
    componentDidMount(){
        this.loadProperty('all')
    }
    loadProperty(){
        let that = this;
        that.setState({
            isLoading:true
        })
        let api = Api;
        api.setUserToken();
        let url = '/property/all?status='+this.state.status; 
        api.axios().get(url).then(res => {
            that.setState({
                isLoading:false
            })
            that.grid.api.setRowData(res.data.data)
        })
    }
    onRowClick(params){
        this.props.rs_router.navigate('/property-details/'+params.data.id)
    }
    onLinkClick(params){
        alert("done")
    }
    changeCompanyStates(status,event){
        let idLsit = [];
        let selectedRows = this.grid.api.getSelectedRows();
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
        api.axios().post('/property/change-status',data).then(res => {
            Helper.alert(res.data.message)
            that.loadProperty();
        })
    }
    onStatusChange(e){
        let that = this;
        this.setState({
            status:e.target.value
        },() => {
            that.loadProperty();
        })
    }
    actionsButtons(){
        let statusOptions = [
            {label:'Available',value:'available'},
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
                    <Button title="Available" onClick={ this.changeCompanyStates.bind(this,'available')} />
                </div>
            </div>
        )
    }
    render() {
        let headerTitles  = [
            { 
                field: "name", headerName:'Projects Name',
                cellRenderer: function(params) {
                    return '<a href="/property-details/'+params.data.id+'">'+ params.value+'</a>'
                  },
                  checkboxSelection: true
            },
            { field: "size", headerName:'Size' },
            { field: "zoning", headerName:'Zoning' },
            { field: "land_area", headerName:'Land Area' },
            { field: "dock_doors", headerName:'Dock Doors' },
            { field: "drive_in_doors", headerName:'Drive-in doors' },
            { field: "clear_height", headerName:'Clear Height' },
            { field: "year_built", headerName:'Year Built' },
            { field: "property_value", headerName:'Property Value' },
            { field: "lease_value", headerName:'Lease Value' },
            { field: "status", headerName:'Property Status' }
        ]
        return (
            <div>
                <div className='secondery_header_wraper'>
                    <div className='container'>
                        <div className='secondery_header'>
                            <Button to={'/property/create'} title="Create Project"/>
                        </div>
                    </div>
                </div>
                { this.state.isLoading ? <SimpleLoader /> : "" }
                <div className='grid_area'>
                    <div className='container-fluid'>
                        <AlliesGrid actions_buttons = {this.actionsButtons.bind(this)} data = { this.state.data} header={headerTitles} onRowClick={this.onRowClick.bind(this)} onGridReady={this.onGridReady.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyArchive;