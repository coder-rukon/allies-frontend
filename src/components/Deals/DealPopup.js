import React, { Component } from 'react';
import Popup from '../widget/Popup';
import Tab from '../widget/Tab/Tab';
import DealActivity from './Activity/DealActivity';
import DealHeader from './Dealpopupitems/DealHeader';
import HeaderActions from './Dealpopupitems/HeaderActions';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';
import FileUploader from '../FileUploader/FileUploader';

class DealPopup extends Component {
    constructor(props){
        super(props);
        this.state ={
            deal:null,
            isLoading:true
        }
    }
    componentDidMount(){
        this.loadDeal()
    }
    loadDeal(){
        let dealId = this.props.id;
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
    
    render() {
        let tabNavs = [
            {title:'Company',id:1},
            {title:'Files',id:2},
            {title:'Contacts',id:3},
            {title:'Team Members',id:4},
        ]
        let deal = this.state.deal;
        if(this.state.isLoading || !deal){
            return <Popup><SimpleLoader/></Popup>

        }
        return (
            <Popup {...this.props} width="1300px">
                <div className='deal_deatils_section'>
                    <DealHeader contactDetails={deal.contactDetails} company={deal.dealWithCompany}/>
                    <HeaderActions deal={deal.deal}/>
                    <div className='row activity_with_tabs'>
                        <div className='col-xs-12 col-md-6'>
                            <DealActivity integrator={deal.deal.id} type="deal"/>
                        </div>
                        <div className='col-xs-12 col-md-6'>
                            <Tab navs={tabNavs}/>
                            <FileUploader/>
                        </div>
                    </div>
                </div>
            </Popup>
        );
    }
}

export default DealPopup;