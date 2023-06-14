import { Grid } from 'ag-grid-community';
import React, { Component } from 'react';

class AlliesGrid extends Component {
    constructor(props){
        super(props);
        this.id = this.props.id ? this.props.id : 'rs_grid';
        this.gridObject = null;

    }
    componentDidMount(){
        if(!this.gridObject){
            this.initGrid();
        }
    }
    initGrid(){
        let gridOptions = {
            columnDefs: this.props.header,
            pagination:true,
            paginationPageSize:50,
            rowData:this.props.data ? this.props.data : null,
            defaultColDef: {sortable: true, filter: true,resizable: true},
            rowSelection: 'single', // allow rows to be selected
            animateRows: true, // have rows animate to new positions when sorted
            onGridReady : this.onGridReady.bind(this),
            onRowClicked: this.onRowClicked.bind(this),
            onCellClicked: this.onCellClicked.bind(this),
            onFirstDataRendered: this.onFirstDataRendered.bind(this),
          };
        var eGridDiv = document.getElementById(this.id);
        this.gridObject = new Grid(eGridDiv, gridOptions);
    }
    onFirstDataRendered(params){
        params.api.sizeColumnsToFit();
    }
    onGridReady(event){
        if(this.props.onGridReady && typeof this.props.onGridReady ==='function' ){
            this.props.onGridReady({...event,componentObj:this})
        }
    }
    onRowClicked(event){
        if(this.props.onRowClick && typeof this.props.onRowClick === 'function'){
            this.props.onRowClick(event)
        }
    }
    onCellClicked(event){
        if(this.props.onCellClicked && typeof this.props.onCellClicked === 'function'){
            this.props.onCellClicked(event)
        }
    }
    render() {
        return (
            <div className='rs_grid_wraper'>
                <div id={this.id} className="ag-theme-alpine" style={{height:this.props.height ? this.props.height : '600px'}}></div>
            </div>
        );
    }
}

export default AlliesGrid;