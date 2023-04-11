import React, { Component } from 'react';
import Api from '../Api';
import Button from '../Forms/Button';
import AlliesGrid from '../Grid/AlliesGrid';
import SimpleLoader from '../widget/SimpleLoader';

class PropertyArchive extends Component {
    constructor(props){
        super(props);
        this.grid = null
        this.state = {
            data:[],
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
        api.axios().get('/property/all').then(res => {
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
    render() {
        let headerTitles  = [
            { 
                field: "name", headerName:'Property Name',
                cellRenderer: function(params) {
                    return '<a href="/property-details/'+params.data.id+'">'+ params.value+'</a>'
                  } 
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
                            <Button to={'/property/create'} title="Create Poperty" className="primary_border"/>
                        </div>
                    </div>
                </div>
                { this.state.isLoading ? <SimpleLoader /> : "" }
                <div className='grid_area'>
                    <div className='container-fluid'>
                        <AlliesGrid data = { this.state.data} header={headerTitles} onRowClick={this.onRowClick.bind(this)} onGridReady={this.onGridReady.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyArchive;