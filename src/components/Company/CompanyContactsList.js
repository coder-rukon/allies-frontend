import React, { Component } from 'react';
import Contacts from '../Contacts/Contacts';

class CompanyContactsList extends Component {
    render() {
        return (
            <div className='contact_list'>
                <Contacts source="company_contact" integrator={this.props.id} />
            </div>
        );
    }
}

export default CompanyContactsList;