import React, { Component } from 'react';
import DealPipelineItemWidget from './DealPipelineItemWidget';

class DealPipleLineItem extends Component {
    render() {
        let stage = this.props.stage;
        let styles = {}
        if(stage.bgColor){
            styles.backgroundColor = stage.color;
        }
        return (
            <div className='deals_piplelins_item'>
                <div className='deals_piplelins_item_inner' style={styles}>
                    <h3 className='deals_piplelins_item_title'>
                        {stage.name}
                    </h3>
                    <div className='deals_piplelins_contents'>
                        <DealPipelineItemWidget deal={1}/>
                        <DealPipelineItemWidget deal={1}/>
                        <DealPipelineItemWidget deal={1}/>
                        <DealPipelineItemWidget deal={1}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DealPipleLineItem;