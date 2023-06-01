import React, { Component } from 'react';
import MasterComponent from '../components/Layout/MasterComponent';
import RsWithRouter from '../components/Inc/RsWithRouter';
import Input from '../components/Forms/Input';
import Dropdown from '../components/Forms/Dropdown';
import Api from '../components/Api';
import Helper from '../components/Helper';
import Button from '../components/Forms/Button';
import SeconderyHeader from '../components/Layout/SeconderyHeader';
import FormValidator from '../inc/FormValidator';
import InputDatePicker from '../components/Forms/InputDatePicker';
import ActionTypes from '../actions/ActionsTypes';
import { connect } from 'react-redux';

class CreateNewDeal extends Component {
    constructor(props){
        super(props);
        this.validatorInit();
        this.state = {
            data:{},
            data_property:{},
            isExistingClient:false,
            isExistingProperty:false,
            accountTypes:[],
            clients:[],
            propertyList:[],
            property:{},
            dealWithClient:{},
            dealStages:[],
            userList:[],
            cityList:[],
            stateList:[],
        }
        
    }
   
    componentDidMount(){
        this.loadAccountTypes()
        this.loadClients()
        this.loadProperty()
        this.loadUsers()
        this.loadDealStages()
        this.loadCountry()
        this.loadState()
        this.loadCity()
    }
    loadCountry(){
        let api = Api;
        api.setUserToken();
        let that = this;
        api.axios().get('/locations/country').then(res => {
            console.log(res);
            that.props.setCountry(res.data)
        })
    }
    loadState(){
        let api = Api;
        api.setUserToken();
        let that = this;
        api.axios().get('/locations/state').then(res => {
            console.log(res);
            that.props.setState(res.data)
        })
    }
    loadCity(){
        let api = Api;
        api.setUserToken();
        let that = this;
        api.axios().get('/locations/city').then(res => {
            console.log(res);
            that.props.setCity(res.data)
        })
    }
    
    validatorInit(){
        let validConfiguration = [ 
            {name:'client_type',displayName:'Client type',types:['Required'], min:1, max:50},
            {name:'company_name',displayName:'Client Company Name',types:['Required'], min:1, max:50},
            {name:'contact_name',displayName:'Contact Name',types:['Required'], min:1, max:50},
            {name:'office_phone_number',displayName:'Phone number',types:['Required'], min:1, max:50},
            {name:'email',displayName:'Email address',types:['Required','Email'], min:1, max:50},
            {name:'title',displayName:'Title',types:['Required'], min:1, max:50},
            {name:'naics_code',displayName:'naics code',types:['Required'], min:1, max:50},
            {name:'address',displayName:'Address',types:['Required'], min:1, max:50},
        ]
        this.clientValidator = new FormValidator(validConfiguration)
        this.propertyValidator = new FormValidator([
            {name:'name',displayName:'Property Name',types:['Required'], min:1, max:50}
        ])
    }
    loadDealStages(){
        let that = this;
        let api = Api;
        api.setUserToken();
        api.axios().get('/deal-stage').then(res => {
            that.setState({
                dealStages:res.data.data
            })
        })
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
    loadClientById(id){
        let api = Api,that = this;
        api.setUserToken();
        that.setState({
            isLoading:true,
            company:{}
        })
        api.axios().get('/account/get-by-id/'+id).then(res => {
            if(res.data.status){
                that.setState({
                    isLoading:false,
                    dealWithClient:res.data.data
                })
            }
        })
    }
    loadPropertyById(id){
        
        let api = Api,that = this;
        api.setUserToken();
        api.axios().get('/property/get/'+id).then(res=>{
            if(res.data.status){
                that.setState({
                    isLoading:false,
                    property:res.data.data,
                })
            }else{
                that.setState({
                    isLoading:false,
                    property:{},
                    notFound:true,
                    errors:{
                        not:[res.data.message]
                    }
                })
            }
            
        })
    }
    loadProperty(){
        let api = Api;
        let that = this;
        api.axios().get('/property/all').then(res => {
            that.setState({
                propertyList:res.data.data
            })
        })
    }
    
    onChangeHandler(e,dataFor = null){
        let oldData = this.state.data;
        this.setState({
            data:{
                ...oldData,
                [e.target.name]:e.target.value
            }
        })
        
    }
    
    dateChangeHandler(name,value){
        let oldData = this.state.data;
        this.setState({
            data:{
                ...oldData,
                [name]:value
            }
        })
        
    }
    
    
    onClientChangeHandler(e){
        let oldData = this.state.dealWithClient;
        this.setState({
            dealWithClient:{
                ...oldData,
                [e.target.name]:e.target.value
            }
        })
        
    }
    
    onPropertyChangeHandler(e){
        let oldData = this.state.property;
        this.setState({
            property:{
                ...oldData,
                [e.target.name]:e.target.value
            }
        })
    }
    getNewClientData(){
        let output = null;
        let client_details = this.state.dealWithClient;
        
        let validator = this.clientValidator;
        if(!validator.isValid(client_details)){
            validator.displayMessage();
        }else{
            output = client_details;
        }
        return output;
    }
    getNewPropertyData(){
        let output = null;
        let propertyData = this.state.property;
        
        let validator = this.propertyValidator;
        if(!validator.isValid(propertyData)){
            validator.displayMessage();
        }else{
            output = propertyData;
        }
        return output;
    }
    onSaveHandler(){

        let data = this.state.data;
        data.device_name = "web"
        let api = Api;
        api.setUserToken();
        let that =this;
        if(!this.state.isExistingClient){
            let newClinetData = this.getNewClientData();
            if(!newClinetData){
                return;
            }
            data.client_details = newClinetData;
        }
        if(!this.state.isExistingProperty){
            let newPropertyData = this.getNewPropertyData();
            if(!newPropertyData){
                return;
            }
            data.property_details = newPropertyData;
        }
        api.axios().post('/deal/create',data).then(res=>{
            Helper.alert(res.data.message,{className:res.data.status ? 'success' : 'error'})
            if(res.data.status === true){
                that.props.rs_router.navigate('/deal-details/'+res.data.data.id)
                Helper.alert("Deal Created")
                that.setState({
                    data:{}
                })
            }
        })
    }
    loadUsers(){
        let api = Api;
        let that = this;
        api.axios().get('/user-list').then(res => {
            that.setState({
                userList:res.data.data
            })
        })
    }
    getNewClientForm(accountTyps){
        let data = this.state.dealWithClient;
        let accountTypesOption = accountTyps
        let userList = this.state.userList.map( item => {
            return {
                label:item.name,
                value:item.id
            }
        })
        let disibaleEdit = this.state.isExistingClient;
        let countryOptions = this.props.location.country.map( item => { return {label: item.name,value:item.id}});
        let stateOptions = this.state.stateList.map( item => { return {label:item.name,value:item.id}});
        let cityOptions = this.state.cityList.map( item => { return {label:item.name,value:item.id}});
        return(
            <div className='row'>
                <Dropdown name="client_type" label="Account Type" hasError={this.clientValidator.hasError('client_type')} options={accountTypesOption} value={data.client_type} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <div className='col-md-12'></div>
                <Input name="company_name" label="Company name" value={data.company_name} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3" disable={disibaleEdit}/>
                <Input name="contact_name" label="Contact name" value={data.contact_name} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="title" label="Title" value={data.title} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="office_phone_number" label="Contact number" value={data.office_phone_number} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <Input name="email" label="Email" value={data.email} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <div className='col-md-12'></div>
                <Input name="naics_code" label="NAICS Code" value={data.naics_code} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <div className='col-md-12'></div>
                <div className='row'>
                    <Dropdown name="country" label="Country" wraperClass="col-md-3" value={data.country} onChange={this.countryChangeHandler.bind(this)} options={countryOptions} />
                    <Dropdown name="state" label="State" wraperClass="col-md-2" value={data.state} onChange={this.stateChangeHandler.bind(this)} options={stateOptions} />
                    <Dropdown name="city" label="City" wraperClass="col-md-2" value={data.city} onChange={this.onClientChangeHandler.bind(this)}  options={cityOptions} />
                    <Input name="zipcode" wraperClass="col-md-2" label="Zip code" value={data.zipcode} onChange = {this.onClientChangeHandler.bind(this)}/>
                    <Input name="suitno" wraperClass="col-md-2" label="Suit no" value={data.suitno} onChange = {this.onClientChangeHandler.bind(this)}/>
                </div>
                <Input name="address" label="Address" inputType="textarea" value={data.address} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <Input name="details" label="Notes" inputType="textarea" value={data.details} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <Input name="industry_type" label="Industry type" value={data.industry_type} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <Input name="sub_industry_type" label="Sub-industry type" value={data.sub_industry_type} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-6"  disable={disibaleEdit}/>
                <div className='col-md-12'></div>
                <Dropdown name="contact_owner"  options={userList}  label="Contact owner" value={data.contact_owner} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="website" label="Website" value={data.website} onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-12"  disable={disibaleEdit}/>
                <h4 className='col-md-12 title'>Social Links</h4>
                <Input name="social_facebook"  value={data.social_facebook}  label="Facebook"  onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="social_twitter"  value={data.social_twitter}  label="Twitter" onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="social_linkedin"  value={data.social_linkedin}  label="LinkedIn" onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
                <Input name="social_instagram"  value={data.social_instagram}  label="Instagram" onChange = {this.onClientChangeHandler.bind(this)} wraperClass="col-xs-12 col-md-3"  disable={disibaleEdit}/>
            </div>
        )
        
    }
    onClientChangeHander(event){
        let oldData = this.state.data;
        this.setState({
            data:{
                ...oldData,
                deal_with_company:event.target.value
            }
        })
        this.loadClientById(event.target.value);
    }
    onChangePropertyHandler(event){
        let oldData = this.state.data;
        this.setState({
            data:{
                ...oldData,
                property:event.target.value
            }
        })
        this.loadPropertyById(event.target.value);
    }
    getProjectForms(){
        let isExistingProperty = this.state.isExistingProperty;
        let property = this.state.property;
        let disibaleEdit = this.state.isExistingProperty;
        return (
            <div className='property_form_wraper'>
                <Input name="name" label="Name" value={property.name} onChange={ this.onPropertyChangeHandler.bind(this)}  disable={disibaleEdit}/>
                <div className='row'>
                    <div className='col-xs-12 col-sm-6'><Input name="size" label="Size"  value={property.size} onChange={ this.onPropertyChangeHandler.bind(this)}  disable={disibaleEdit}/></div>
                    <div className='col-xs-12 col-sm-6'><Input name="zoning" label="Zoning"  value={property.zoning} onChange={ this.onPropertyChangeHandler.bind(this)}  disable={disibaleEdit}/></div>
                </div>
                <Input name="land_area" label="Land area"  value={property.land_area} onChange={ this.onPropertyChangeHandler.bind(this)} disable={disibaleEdit} />
                <div className='row'>
                    <div className='col-xs-12 col-sm-4'><Input name="dock_doors" label="Dock doors"  value={property.dock_doors} onChange={ this.onPropertyChangeHandler.bind(this)}  disable={disibaleEdit} /></div>
                    <div className='col-xs-12 col-sm-4'><Input name="drive_in_doors" label="Drive in doors"  value={property.drive_in_doors} onChange={ this.onPropertyChangeHandler.bind(this)}  disable={disibaleEdit} /></div>
                    <div className='col-xs-12 col-sm-4'><Input name="clear_height" label="Clear height"  value={property.clear_height} onChange={ this.onPropertyChangeHandler.bind(this)}  disable={disibaleEdit} /></div>
                    <div className='col-xs-12 col-sm-4'><Input name="year_built" label="Year built"  value={property.year_built} onChange={ this.onPropertyChangeHandler.bind(this)}  disable={disibaleEdit} /></div>
                    <div className='col-xs-12 col-sm-3'><Input name="property_value" label="Property value"  value={property.property_value} onChange={ this.onPropertyChangeHandler.bind(this)}  disable={disibaleEdit} /></div>
                    <div className='col-xs-12 col-sm-3'><Input name="lease_value" label="Lease value"  value={property.lease_value} onChange={ this.onPropertyChangeHandler.bind(this)}  disable={disibaleEdit} /></div>
                </div>
                <div className='row'>
                    <div className='col-xs-12 col-sm-4'><Dropdown disable={disibaleEdit} name="status" label="Status" value={property.status} onChange={ this.onPropertyChangeHandler.bind(this)} options={[{label:'Available' , value:"available"},{label:'Not Available' , value:"not_available"}]}/></div>
                </div>
            </div>
        )
    }
    countryChangeHandler(event){
        let allState = [];
        this.props.location.state.forEach(element => {
            if(element.country_id == event.target.value){
                allState.push(element);
            }
        });
        let dealWithClient = this.state.dealWithClient;
        this.setState({
            dealWithClient:{
                ...dealWithClient,
                [event.target.name]:event.target.value
            },
            stateList:allState
        })
    }
    stateChangeHandler(event){
        let allCity = [];
        this.props.location.city.forEach(element => {
            if(element.state_id == event.target.value){
                allCity.push(element);
            }
        });
        let dealWithClient = this.state.dealWithClient;
        this.setState({
            dealWithClient:{
                ...dealWithClient,
                [event.target.name]:event.target.value
            },
            cityList:allCity
        })
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
        let property = this.state.propertyList.map( item => {
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
        let isExistingProperty = this.state.isExistingProperty;
        return (
            <div className='new_deal_page'>
                <SeconderyHeader>
                    <Button to={'/deals-pipeline/all'} title="Alll deals" className=""/>
                    <h2 className='title'>Create Deal</h2>
                </SeconderyHeader>
                <div className='container pt-4 pb-4'>
                    <div className='new_deal_form'>
                        <div className='row'>
                            <Input wraperClass="col-xs-12 col-md-6" name="name" label="Deal title / Name" value={data.name} onChange = {this.onChangeHandler.bind(this)}/>
                            <Dropdown wraperClass="col-xs-12 col-md-2" name="deal_type" label="Deal Type" id="deal_type" options={accountTypesOption} value={data.deal_type} onChange = {this.onChangeHandler.bind(this)}/>
                            <Dropdown wraperClass="col-xs-12 col-md-2" name="deal_stage" label="Deal Stage" id="deal_stage" options={deal_stagesOption} value={data.deal_stage} onChange = {this.onChangeHandler.bind(this)}/>
                            <div className='col-md-12'></div>
                            <InputDatePicker wraperClass="col-xs-12 col-md-2" name="agreement_starting_date" inputClassName="agreement_starting_date" label="Agreement Starting Date" value={data.agreement_starting_date} onChange = {this.dateChangeHandler.bind(this)}/>
                            <InputDatePicker wraperClass="col-xs-12 col-md-2" name="agreement_end"  inputClassName="agreement_end" label="Agreement End Date" value={data.agreement_end} onChange = {this.dateChangeHandler.bind(this)}/>
                        </div>
                        <h5 className='form_group_title'>Deal with Company</h5>
                        <div className='custom_checkbox_option'>
                            <span className= {!isExistingClient ? 'active' : ''} onClick={ (e) => { this.setState({isExistingClient:false,dealWithClient:{}}) }}>New Client</span><span  className= {isExistingClient ? 'active' : ''}  onClick={ (e) => { this.setState({isExistingClient:true}) }}>Select existing client</span>
                        </div>
                        <Dropdown disable={!this.state.isExistingClient}  name="deal_with_company" label="Deal With Company" id="deal_with_company" options={clients} value={data.deal_with_company} onChange = {this.onClientChangeHander.bind(this)}/>
                        {this.getNewClientForm(accountTypesOption)}
                        <div className='custom_checkbox_option'>
                            <span className= {!isExistingProperty ? 'active' : ''} onClick={ (e) => { this.setState({isExistingProperty:false,property:{}}) }}>New Project</span><span  className= {isExistingProperty ? 'active' : ''}  onClick={ (e) => { this.setState({isExistingProperty:true}) }}>Select existing project</span>
                        </div>
                        <Dropdown disable={!isExistingProperty} name="property" label="Deal With Property" id="deal_property" options={property} value={data.property} onChange = {this.onChangePropertyHandler.bind(this)}/>
                        { this.getProjectForms() }
                        <Button onClick={ e => this.onSaveHandler(e)} title="Save" className="btn_blue"/>
                    </div>
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = (props) => {
    return {
        location:props.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return({
        setCountry: (country) => { dispatch({type:ActionTypes.SET_COUNTRY,payload:country})},
        setState: (state) => { dispatch({type:ActionTypes.SET_STATE,payload:state})},
        setCity: (city) => { dispatch({type:ActionTypes.SET_CITY,payload:city})},
    })
}
export default MasterComponent( RsWithRouter( connect(mapStateToProps,mapDispatchToProps) (CreateNewDeal)));