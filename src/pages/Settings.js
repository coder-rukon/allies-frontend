import React, { Component } from 'react';
import MasterComponent from '../components/Layout/MasterComponent';
import RsWithRouter from '../components/Inc/RsWithRouter';
import SuperAdminOnly from '../components/Layout/SuperAdminOnly';
import PropertyForm from '../components/Settings/PropertyForm';
import Tab from '../components/widget/Tab/Tab';
import PropertyDropdownSettings from '../components/Settings/PropertyDropdownSettings';

class Settings extends Component {
    dispalyPage(){
        let {page} = this.props.rs_router.params;
        if(page ==='property-form'){
            return <PropertyForm/>
        }
        if(page ==='property-form-dropdown'){
            return <PropertyDropdownSettings/>
        }
    }
    tabOnClickHandler(item){
        this.props.rs_router.navigate(item.slug)
    }
    render() {
        let navs = [
            {id:'property_form',title:'Property Form',isActive:true,slug:'/super-admin/settings/property-form'},
            {id:'property_form_dropdown',title:'Property Form Dropdown',slug:'/super-admin/settings/property-form-dropdown'},
        ]
        return (
            <SuperAdminOnly>
                <div className='container'>
                    <Tab navs={navs} onClick={this.tabOnClickHandler.bind(this)}></Tab>
                </div>
                <div>
                    {this.dispalyPage()}
                </div>
            </SuperAdminOnly>
        );
    }
}

export default MasterComponent ( RsWithRouter(Settings));