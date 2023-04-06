import React, { Component } from 'react';
import DealPopup from './DealPopup';

class DealPipelineItemWidget extends Component {
    constructor(props){
        super(props);
        this.state = {
            isPopupOpen:false
        }
    }
    openDealDetailsPopup(e){
        
        this.setState({
            isPopupOpen:true
        })
    }
    displayPropertyDetails(){
        let property = this.props.property;
        if(!property){
            return<></>
        }
        return(
            <>
                <li><span>Property</span> : {property.name}</li>
                <li><span>Size</span> : {property.size}</li>
                <li><span>Zoning</span> : {property.zoning}</li>
                <li><span>Land Area</span> : {property.land_area}</li>
                <li><span>Year Built</span> : {property.year_built}</li>
            </>
        )
    }
    render() {
        let deal = this.props.deal;
        return (
            <>
                <div className='pipeline_widget' onClick={ e => this.openDealDetailsPopup(e)}>
                    <div className='dpw_title'>{deal.name}</div>
                    <ul className='options'>
                        {this.displayPropertyDetails()}
                    </ul>
                </div>
                {this.state.isPopupOpen ? <DealPopup id={deal.id} onClose={ e => { this.props.reloadDealsPage(); this.setState({isPopupOpen:false} ) }}/> : '' }
            </>
            
        );
    }
}

export default DealPipelineItemWidget;