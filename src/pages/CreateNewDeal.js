import React, { Component } from 'react';
import MasterComponent from '../components/Layout/MasterComponent';
import RsWithRouter from '../components/Inc/RsWithRouter';
import Input from '../components/Forms/Input';
import Dropdown from '../components/Forms/Dropdown';
import Api from '../components/Api';
import Helper from '../components/Helper';
import Button from '../components/Forms/Button';
import SeconderyHeader from '../components/Layout/SeconderyHeader';

class CreateNewDeal extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{},
            isExistingClient:false,
            accountTypes:[],
            clients:[],
            property:[],
            dealStages:[]
        }
    }
    componentDidMount(){
        this.loadAccountTypes()
        this.loadClients()
        this.loadProperty()
    }
    loadAccountTypes(){
        let api = Api;
        let that = this;
        api.axios().get('/account-types').then(res => {
            that.setState({
                accountTypes:res.data.data
            })
        })
    }
    loadClients(){
        let api = Api;
        let that = this;
        api.axios().get('/account/all').then(res => {
            that.setState({
                clients:res.data.data
            })
        })
    }
    loadProperty(){
        let api = Api;
        let that = this;
        api.axios().get('/property/all').then(res => {
            that.setState({
                property:res.data.data
            })
        })
    }
    
    onChangeHandler(e){
        let oldData = this.state.data;
        this.setState({
            data:{
                ...oldData,
                [e.target.name]:e.target.value
            }
        })
    }
    onSaveHandler(){
        let data = this.state.data;
        data.device_name = "web"
        let api = Api;
        api.setUserToken();
        let that =this;
        api.axios().post('/deal/create',data).then(res=>{
            Helper.alert(res.data.message,{className:res.data.status ? 'success' : 'error'})
            if(res.data.status === true){
                that.setState({
                    data:{}
                })
            }
        })
    }
    onChangeClientSource(clientSource){

    }
    getNewClinetForm(){
        let data = {}
        let accountTypesOption = []
        let userList = []
        let disibaleEdit = this.state.isExistingClient;
        return(
            <div className='row'>
                <Dropdown name="client_type" label="Account Type" options={accountTypesOption} value={data.client_type} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <div className='col-md-12'></div>
                <Input name="company_name" label="Company name" value={data.company_name} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3" disable={disibaleEdit}/>
                <Input name="contact_name" label="Contact name" value={data.contact_name} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="title" label="Title" value={data.title} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="office_phone_number" label="Contact number" value={data.office_phone_number} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <Input name="email" label="Email" value={data.email} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <div className='col-md-12'></div>
                <Input name="naics_code" label="NAICS Code" value={data.naics_code} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <div className='col-md-12'></div>
                <Input name="address" label="Address" inputType="textarea" value={data.address} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <Input name="notes" label="Notes" inputType="textarea" value={data.notes} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <Input name="industry_type" label="Industry type" value={data.industry_type} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <Input name="sub_industry_type" label="Sub-industry type" value={data.sub_industry_type} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <div className='col-md-12'></div>
                <Dropdown name="contact_owner"  options={userList}  label="Contact owner" value={data.contact_owner} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="website" label="Website" value={data.website} onChange = {this.onChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-12"  disable={disibaleEdit}/>
                <h4 className='col-md-12 title'>Social Links</h4>
                <Input name="facebook" label="Facebook" wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="twitter" label="Twitter" wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="linkedin" label="LinkedIn" wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
            </div>
        )
        
    }
    render() {
        let accountTypesOption = this.state.accountTypes.map( item => {
            return {
                label:item.name,
                value:item.id
            }
        })
        let deal_stagesOption = this.state.dealStages.map( item => {
            return {
                label:item.name,
                value:item.id
            }
        })
        let property = this.state.property.map( item => {
            return {
                label:item.name,
                value:item.id
            }
        })
        let clients = this.state.clients.map( item => {
            return {
                label:item.company_name,
                value:item.id
            }
        })
        let data = this.state.data;
        let isExistingClient = this.state.isExistingClient;
        return (
            <div className='new_deal_page'>
                <SeconderyHeader>
                    <Button to={'/deals-pipeline/all'} title="Alll deals" className="primary_border"/>
                    <h2 className='title'>Create Deal</h2>
                </SeconderyHeader>
                <div className='container pt-4 pb-4'>
                    <div className='new_deal_form'>
                        <div className='row'>
                            <Input wraperClass="col-xs-12 col-md-6" name="name" label="Deal title / Name" value={data.name} onChange = {this.onChangeHandler.bind(this)}/>
                            <div className='col-md-12'></div>
                            <Dropdown wraperClass="col-xs-12 col-md-3" name="deal_type" label="Deal Type" id="deal_type" options={accountTypesOption} value={data.deal_type} onChange = {this.onChangeHandler.bind(this)}/>
                            <Dropdown wraperClass="col-xs-12 col-md-3" name="deal_stage" label="Deal Stage" id="deal_stage" options={deal_stagesOption} value={data.deal_stage} onChange = {this.onChangeHandler.bind(this)}/>
                        </div>
                        <h5 className='form_group_title'>Deal with client</h5>
                        <div className='custom_checkbox_option'>
                            <span className= {!isExistingClient ? 'active' : ''} onClick={ (e) => { this.setState({isExistingClient:false}) }}>New Client</span><span  className= {isExistingClient ? 'active' : ''}  onClick={ (e) => { this.setState({isExistingClient:true}) }}>Select existing client</span>
                        </div>
                        {
                            this.state.isExistingClient ? 
                            <Dropdown name="deal_with_company" label="Deal With Client" id="deal_with_company" options={clients} value={data.deal_with_company} onChange = {this.onChangeHandler.bind(this)}/>
                            : 
                            ""
                        }
                        {this.getNewClinetForm()}
                        <Dropdown name="property" label="Deal With Property" id="deal_property" options={property} value={data.property} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input name="agreement_starting_date" label="Agreement Starting Date" value={data.agreement_starting_date} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input name="agreement_length" label="Agreement Length" value={data.agreement_length} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input name="agreement_end" label="Agreement End Date" value={data.agreement_end} onChange = {this.onChangeHandler.bind(this)}/>
                        <Button onClick={ e => this.onSaveHandler(e)} title="Save" className="btn_blue"/>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default MasterComponent( RsWithRouter(CreateNewDeal));