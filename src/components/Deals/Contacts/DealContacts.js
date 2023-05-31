import React, { Component } from 'react';
import Button from '../../Forms/Button';
import Contacts from '../../Contacts/Contacts';

class DealContacts extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            isEditing:false
        }
    }
    

    render() {
        let company = this.props.client;
        let deal = this.props.deal;
        return (
            <div className='company_deatils_tab'>
                <Contacts source="deal" integrator={deal.id} />
            </div>
        );
    }
}

export default DealContacts;