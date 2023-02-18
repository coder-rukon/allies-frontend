import React, { Component } from 'react';
import Popup from '../widget/Popup';
import Tab from '../widget/Tab/Tab';
import DealActivity from './Activity/DealActivity';
import DealHeader from './Dealpopupitems/DealHeader';
import HeaderActions from './Dealpopupitems/HeaderActions';

class DealPopup extends Component {
    render() {
        let tabNavs = [
            {title:'Files',id:1},
            {title:'Contacts',id:2},
            {title:'Team Members',id:3},
        ]
        return (
            <Popup {...this.props} width="1200px">
                <div className='deal_deatils_section'>
                    <DealHeader/>
                    <HeaderActions/>
                    <div className='row activity_with_tabs'>
                        <div className='col-xs-12 col-md-7'>
                            <DealActivity/>
                        </div>
                        <div className='col-xs-12 col-md-5'>
                            <Tab navs={tabNavs}/>
                        </div>
                    </div>
                </div>
            </Popup>
        );
    }
}

export default DealPopup;