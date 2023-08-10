import React, { Component } from 'react';
import AccountsTabs from '../components/Accounts/AccountsTabs';
import DealsPipelines from '../components/Deals/DealsPipelines';
import NewDealsPopups from '../components/Deals/NewDealsPopups';
import Button from '../components/Forms/Button';
import MasterComponent from '../components/Layout/MasterComponent';
import CategoryTab from '../components/widget/CategoryTab';
import RsWithRouter from '../components/Inc/RsWithRouter';

class DealsPipleline extends Component {
    constructor(props){
        super(props);
        this.state = {
            isPopupOpen:false,
            filterType:'trbr'
        }
    }
    openDealCreatePopup(e){
        this.setState({
            isPopupOpen:true
        })
    }
    getPageClass(){
        let output = 'deal_pipeline_page ';
        if(this.state.filterType == 'lrsr'){
            output+=' deepblue_template';
        }
        return output
    }
    render() {
        let category = this.props.rs_router.params.category;
        if(category === 'all'){
            category = null;
        }
        return (
            <div className={ this.getPageClass() }>
                <div className='secondery_header_wraper' style={{display:'none'}}>
                    <div className='container'>
                        <div className='secondery_header'>
                            <div className='left_items'>
                                <CategoryTab urlPrefix='/deals-pipeline'/>
                            </div>
                            <div className='right_items'>
                                <Button to='/deal/new'  title="+ Create new deal" className=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-fluid'>
                    <div className='filter_type'>
                        <span className={this.state.filterType == 'trbr' ? 'active' : ''} onClick={ e => { this.setState({filterType:'trbr'})}}>TR | BR</span>
                        <span  className={this.state.filterType == 'lrsr' ? 'active' : ''}  onClick={ e => { this.setState({filterType:'lrsr'})}}>LR | SR</span>
                    </div>
                </div>
                
                <div className='container-fluid'>
                    <DealsPipelines category={category}/>
                </div>
            </div>
        );
    }
}

export default MasterComponent( RsWithRouter(DealsPipleline)) ;