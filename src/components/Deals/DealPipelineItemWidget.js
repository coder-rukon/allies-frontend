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
    render() {
        return (
            <>
                <div className='pipeline_widget' onClick={ e => this.openDealDetailsPopup(e)}>
                    <div className='dpw_title'>New Website Design</div>
                    <ul className='options'>
                        <li><span>Size</span> : 150</li>
                        <li><span>Zoning</span> : 150</li>
                        <li><span>Land Area</span> : 150</li>
                        <li><span>Year Built</span> : 150</li>
                    </ul>
                </div>
                {this.state.isPopupOpen ? <DealPopup onClose={ e => { this.setState({isPopupOpen:false}) }}/> : '' }
            </>
            
        );
    }
}

export default DealPipelineItemWidget;