import React, { Component } from 'react';

class DealHeader extends Component {
    render() {
        let company = {
            name:'Abc Company',
            logo: 'https://alliescommercialrealty.com/wp-content/uploads/2020/09/Allied-Commercial-Realty-Horizontal-Logo-300x103.png'
        }
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
                            <h5>Md Rukon shekh</h5>
                            <a className='link' href="rukon.info@gmail.com" target="_blank">rukon.info@gmail.com</a>
                            <a className='link' href="01733435951" target="_blank">01733435951</a>
                            <span>View More</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DealHeader;