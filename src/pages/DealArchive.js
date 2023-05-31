import React, { Component } from 'react';
import MasterComponent from '../components/Layout/MasterComponent';
import RsWithRouter from '../components/Inc/RsWithRouter';
import SeconderyHeader from '../components/Layout/SeconderyHeader';
import AlliesGrid from '../components/Grid/AlliesGrid';
import Api from '../components/Api';
import Settings from '../components/Settings';

class DealArchive extends Component {
    constructor(props){
        super(props);
        this.isCalledApi = false;
        this.state = {
            deals:[]
        }
        this.grid = null;
    }
    componentDidMount(){
        this.loadArchiveDeals()
    }
    loadArchiveDeals(){
        if(this.isCalledApi){
            return;
        }
        this.isCalledApi = true;
        let that = this;
        that.setState({
            deals:[],
            isLoading:true
        })
        let api = Api;
        api.setUserToken();
        let data = {deal_status:'archive'}
        api.axios().post(Settings.apiUrl+'/deal/all',data).then(res => {
            that.setState({
                deals:res.data.data,
                isLoading:false
            })
            that.grid.api.setRowData(res.data.data);
        })
    }
    onRowClicked(event){
        console.log(event);
        this.props.rs_router.navigate('/deal-details/'+event.data.deal.id);
    }
    render() {
        let header = [
            {field:'deal.name',headerName:'Deal Title'},
            {field:'deal.archive_date',headerName:'Archive date'},
            {field:'archive_by.name',headerName:'Archive by'},
        ]
        return (
            <>
               <SeconderyHeader>
                        <h2>Deal Archive</h2>
                </SeconderyHeader> 
                <div className='deal_archive_page'>
                    <div className='container'>
                        <AlliesGrid onRowClick= {this.onRowClicked.bind(this)} header={header} data={this.state.deals} onGridReady={grid => { this.grid = grid  }}/>
                    </div>
                </div>
            </>
        );
    }
}

export default  MasterComponent( RsWithRouter(DealArchive));