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
import DealContacts from '../components/Deals/Contacts/DealContacts';
import Notes from '../components/Notes/Notes';

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
        let deal = this.state.deal;
        let activeTabId = this.state.activeTab;
        if(activeTabId ==1){
            return <Notes integrator={deal.deal.id} type="deal"/>
        }
        if(activeTabId == 2){
            return <DealActivity integrator={deal.deal.id} type="deal"/>
        }
        return <></>
    }
    render() {
        let tabNavs = [
            {title:'Notes',id:1},
            {title:'Activity',id:2},
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
                                
                                <div className='mt-3'>
                                    
                                    <h2 className='section_title'>Projects Details</h2>
                                    <PropertyDetails details={deal ? deal.property  : null }/>
                                    <h2 className='section_title'>Lead Details</h2>
                                    <CompanyDetailsTab details={deal ? deal.dealWithCompany  : null } />
                                    <h2 className='section_title'>Contacts</h2>
                                    <DealContacts deal={deal ? deal.deal : null} client={deal ? deal.dealWithCompany  : null }/>
                                    <h2 className='section_title'>Team</h2>
                                </div>
                            </div>
                            <div className='col-xs-12 col-md-4'>
                                <h2 className='section_title'>Files</h2>
                                <FileUploader type="deal_files" integrator={deal ?  deal.deal.id : null} integrator_type="deal"/>
                                <Tab navs={tabNavs} activeTab={1} onClick={this.onTabItemClickHandler.bind(this)}/>
                                <div className='mt-3'>
                                    {this.getTabDetails()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default  MasterComponent( RsWithRouter(DealDetails));