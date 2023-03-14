import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import CompanyContactsList from '../components/Company/CompanyContactsList';
import CompanyDealsList from '../components/Company/CompanyDealsList';
import CompanyDetailsTab from '../components/Company/CompanyDetailsTab';
import CompanyMediaFiles from '../components/Company/CompanyMediaFiles';
import RsWithRouter from '../components/Inc/RsWithRouter';
import MasterComponent from '../components/Layout/MasterComponent';
import SimpleLoader from '../components/widget/SimpleLoader';
import TabNav from '../components/widget/TabNav';

class CompanyDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            props:{
                isLoading:false
            }
        }
    }
    getPage(){
        let {page,id} = this.props.rs_router.params;
        if(page =='details'){
            return <CompanyDetailsTab id={id} />
        }else if(page =='files'){
            return <CompanyMediaFiles id={id} />
        }else if(page =='deals'){
            return <CompanyDealsList id={id} />
        }else if(page =='contacts'){
            return <CompanyContactsList id={id} />
        }else{
            return <>404</>
        }
    }
    render() {
        let navItems = [
            {name:'Company Details',id:'details'},
            {name:'Files',id:"files"},
            {name:'Contacts',id:"contacts"},
            {name:'Deals',id:"deals"},
        ]
        let companyId = this.props.rs_router.params.id;
        return (
            <div className="company_details_page">
                { this.state.isLoading ? <SimpleLoader /> : "" }
                <div className='container mt-3'>
                    <TabNav items={navItems} urlPrefix={"/company/"+companyId} />
                </div>
                <div className='container mt-3'>
                    {this.getPage()}
                </div>
            </div>
        );
    }
}
export default MasterComponent( RsWithRouter(CompanyDetails) );
