import React, { Component } from 'react';
import TabNav from './TabNav';

class CategoryTab extends Component {
    render() {
        let navItems = [
            {name:'Seller Rep (SR)',id:1},
            {name:'Landlord Rep (LR)',id:2},
            {name:'Buyer Rep (BR)',id:3},
            {name:'Tenant Rep (TR)',id:4},
        ]
        return (
            <>
                <TabNav items={navItems} urlPrefix={this.props.urlPrefix}/>
            </>
        );
    }
}

export default CategoryTab;