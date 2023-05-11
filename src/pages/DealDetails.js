import React, { Component } from 'react';
import RsWithRouter from '../components/Inc/RsWithRouter';
import MasterComponent from '../components/Layout/MasterComponent';
import SimpleLoader from '../components/widget/SimpleLoader';
import DealHeader from '../components/Deals/Dealpopupitems/DealHeader';
import HeaderActions from '../components/Deals/Dealpopupitems/HeaderActions';
import DealActivity from '../components/Deals/Activity/DealActivity';
import Tab from '../components/widget/Tab/Tab';
import FileUploader from '../components/FileUploader/FileUploader';
import Api from '../components/Api';
import SeconderyHeader from '../components/Layout/SeconderyHeader';
import Button from '../components/Forms/Button';
import CompanyDetailsTab from '../components/Company/CompanyDetailsTab';
import PropertyDetails from '../components/Property/PropertyDetails';

class DealDetails extends Component {
    constructor(props){
        super(props);
        this.state ={
            deal:null,
            activeTab:1,
            isLoading:true
        }
    }
    componentDidMount(){
        this.loadDeal()
    }
    loadDeal(){
        let dealId = this.props.rs_router.params.id;
        let api = Api;
        api.setUserToken();
        let that = this;
        this.setState({
            isLoading:true
        })
        api.axios().get('/deal/get-by-id/'+dealId).then(res => {
            that.setState({
                isLoading:false,
                deal:res.data.data
            })
        })
    }
    onTabItemClickHandler(item){
        this.setState({
            activeTab:item.id
        })
    }
    getTabDetails(){
        let activeTab = this.state.activeTab;
        let deal = this.state.deal;
        if(activeTab ===1){
            return <CompanyDetailsTab details={deal ? deal.dealWithCompany  : null } />
        }
        else if(activeTab ===2){
            return <PropertyDetails details={deal ? deal.property  : null }/>;
        }
        else if(activeTab ===3){
            return <FileUploader/>;
        }
        else if(activeTab ===6){
            return <p>{deal.details}</p>;
        }
        return "Tab contents not found!"
    }
    render() {
        let tabNavs = [
            {title:'Company',id:1},
            {title:'Projects',id:2},
            {title:'Files',id:3},
            {title:'Contacts',id:4},
            {title:'Team Members',id:5},
            {title:'Notes',id:6},
        ]
        let deal = this.state.deal;
        if(this.state.isLoading || !deal){
            return <SimpleLoader/>

        }
        
        return (
            <>
                <SeconderyHeader>
                        <Button to="/deals-pipeline/all" title="All Deals" />
                        <h2>Deal Details</h2>
                </SeconderyHeader>
                <div className='deal_deatils_section pt-5 pb-4'>
                    
                    <div className='container'>
                        
                        <DealHeader contactDetails={deal.contactDetails} company={deal.dealWithCompany}/>
                        <HeaderActions deal={deal.deal}/>
                        <div className='row activity_with_tabs'>
                            <div className='col-xs-12 col-md-8'>
                                <Tab navs={tabNavs} activeTab={1} onClick={this.onTabItemClickHandler.bind(this)}/>
                                <div className='mt-3'>
                                    { this.getTabDetails() }
                                </div>
                            </div>
                            <div className='col-xs-12 col-md-4'>
                                <DealActivity integrator={deal.deal.id} type="deal"/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default  MasterComponent( RsWithRouter(DealDetails));