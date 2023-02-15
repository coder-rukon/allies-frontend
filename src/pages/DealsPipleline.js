import React, { Component } from 'react';
import AccountsTabs from '../components/Accounts/AccountsTabs';
import DealsPipelines from '../components/Deals/DealsPipelines';
import NewDealsPopups from '../components/Deals/NewDealsPopups';
import Button from '../components/Forms/Button';
import MasterComponent from '../components/Layout/MasterComponent';

class DealsPipleline extends Component {
    constructor(props){
        super(props);
        this.state = {
            isPopupOpen:false
        }
    }
    openDealCreatePopup(e){
        this.setState({
            isPopupOpen:true
        })
    }
    render() {
        return (
            <div className='deal_pipeline_page'>
                <div className='secondery_header_wraper'>
                    <div className='container'>
                        <div className='secondery_header'>
                            <div className='left_items'>
                                <AccountsTabs/>
                            </div>
                            <div className='right_items'>
                                <Button title="+ Create new deal" onClick={ e => this.openDealCreatePopup(e)} className="primary_border"/>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isPopupOpen ? <NewDealsPopups onClose={ e => { this.setState({isPopupOpen:false}) }}/> : '' }
                <div className='container-fluid'>
                    <DealsPipelines/>
                </div>
            </div>
        );
    }
}

export default MasterComponent(DealsPipleline) ;