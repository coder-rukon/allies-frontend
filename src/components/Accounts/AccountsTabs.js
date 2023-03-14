import React, { Component } from 'react';
import TabNav from '../widget/TabNav';

class AccountsTabs extends Component {
    render() {
        let navItems = [
            {name:'All Accounts',id:'all'},
            {name:'Seller Rep (SR)',id:1},
            {name:'Landlord Rep (LR)',id:2},
            {name:'Buyer Rep (BR)',id:3},
            {name:'Tenant Rep (TR)',id:4},
        ]
        return (
            <>
                <TabNav items={navItems} urlPrefix="/accounts" />
            </>
        );
    }
}

export default AccountsTabs;