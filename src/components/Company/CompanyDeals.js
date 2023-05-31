import React, { Component } from 'react';
import SeconderyHeader from '../Layout/SeconderyHeader';
import AlliesGrid from '../Grid/AlliesGrid';
import RsWithRouter from '../Inc/RsWithRouter';
import Settings from '../Settings';
import Api from '../Api';

class CompanyDeals extends Component {
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
        let data = {deal_with_company:this.props.deal_id}
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
            {field:'deal.agreement_starting_date',headerName:'Agreement starting date'},
            {field:'deal.agreement_end',headerName:'Agreement end date'},
            {field:'deal.deal_status',headerName:'Status'},
        ]
        return (
            <div className='company_deals'>
                <AlliesGrid onRowClick= {this.onRowClicked.bind(this)} header={header} data={this.state.deals} onGridReady={grid => { this.grid = grid  }}/>
            </div>
        );
    }
}

export default RsWithRouter(CompanyDeals);