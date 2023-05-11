import React, { Component } from 'react';
import RsWithRouter from '../Inc/RsWithRouter';

class DealPipelineItemWidget extends Component {
    constructor(props){
        super(props);
        this.state = {
            isPopupOpen:false
        }
    }
    onClickHandler(e){
        let deal = this.props.deal;
        this.props.rs_router.navigate('/deal-details/'+deal.id);
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
                <div className='pipeline_widget' onClick={ e => this.onClickHandler(e)}>
                    <div className='dpw_title'>{deal.name}</div>
                    <ul className='options'>
                        {this.displayPropertyDetails()}
                    </ul>
                </div>
            </>
            
        );
    }
}

export default RsWithRouter(DealPipelineItemWidget);