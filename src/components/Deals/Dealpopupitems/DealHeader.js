import React, { Component } from 'react';

class DealHeader extends Component {
    render() {
        let company = {
            name: this.props.company ?  this.props.company.company_name : '',
            logo: 'https://alliescommercialrealty.com/wp-content/uploads/2020/09/Allied-Commercial-Realty-Horizontal-Logo-300x103.png'
        }
        let contactDetails = this.props.contactDetails ? this.props.contactDetails : {};
        return (
            <div className='deal_header'>
                <div className='d-flex dh_items'>
                    <div className='dh_item'>
                        <div className='company'>
                            <img src={company.logo} alt={company.name}  />
                            <span>{company.name}</span>
                        </div>
                    </div>
                    <div className='dh_item'>
                        <div className='contact_details'>
                            <h5>{contactDetails.name}</h5>
                            <a className='link' href={`mailto:${contactDetails.email}`} target="blank">{contactDetails.email}</a>
                            <a className='link' href={'tel:'+contactDetails.phone} target="blank">{contactDetails.phone}</a>
                            <span>View More</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DealHeader;