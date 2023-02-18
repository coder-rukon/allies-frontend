import React, { Component } from 'react';
import Button from '../../Forms/Button';
import Dropdown from '../../Forms/Dropdown';

class HeaderActions extends Component {
    render() {
        let dropdownOptions=  [
            {label:'abc',value:'1'},
            {label:'abc2',value:'2'}
        ]
        return (
            <div className='action_header'>
                <div className='action_header_row'>
                    <div className='left_items'>
                        <div>Date<span>10-20-2020</span></div>
                        <div>Size<span>2700sf</span></div>
                        <div>Type<span>Company</span></div>
                    </div>
                    <div className='right_items'>
                        <div className='right_item'>
                            <Dropdown className="dropdown_lg" options={dropdownOptions} value="2"/>
                        </div>
                        <div className='right_item'>
                            <Button title="D" className="delete_btn" iconClass="delete_icon"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderActions;