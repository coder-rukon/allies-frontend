import React, { Component } from 'react';
import DealPipleLineItem from './DealPipleLineItem';

class DealsPipelines extends Component {
    render() {
        let dealStage = [
            { name:'Inquiry', id: 1,bgColor:'#DFE4E6'},
            { name:'Nitial Meeting', id: 1},
            { name:'Lient Engagement', id: 1},
            { name:'Arketing in Progress', id: 1},
            { name:'Roperty Tour', id: 1 , bgColor:'#D4FAED'},
            { name:'Roposal/LOI', id: 1},
            { name:'Urchase/Lease Agreement', id: 1},
            { name:'Roperty Survey (BR)', id: 1},
            { name:'Roperty Survey (TR)', id: 1},
            { name:'Deal Closed', id: 1}
        ]
        return (
            <div className='deals_piplelins'>
                <div className='deals_piplelins_row'>
                    {
                        dealStage.map( (stage,key ) => {
                            return <DealPipleLineItem stage ={stage} category={1} />
                        })
                    }
                </div>
            </div>
        );
    }
}

export default DealsPipelines;