import React, { Component } from 'react';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Popup from '../widget/Popup';

class NewDealsPopups extends Component {
    render() {
        return (
            <Popup {...this.props} width="480px">
                <div className='new_deals_popup'>
                    <h2 className='title'>New Deal</h2>
                    <Input name="account_type" label="Account Type"/>
                    <Input name="company_name" label="Compnay Name"/>
                    <Input name="contact_name" label="Contact Name"/>
                    <Input name="office_phone_number" label="Office Phone Number"/>
                    <Input name="email_address" label="Email Address"/>
                    <Input name="address" label="Address" inputType="textarea"/>
                    <Input name="company_website" label="Website"/>
                    <h4 className='title'>Social Links</h4>
                    <Input name="facebook" label="Facebook"/>
                    <Input name="twitter" label="Twitter"/>
                    <Input name="linkedin" label="LinkedIn"/>
                    <Button title="Save" className="btn_blue"/>
                </div>
            </Popup>
        );
    }
}

export default NewDealsPopups;