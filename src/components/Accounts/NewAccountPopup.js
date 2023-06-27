import React, { Component } from 'react';
import Api from '../Api';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Lists from '../widget/Lists/Lists';
import Popup from '../widget/Popup';
import Dropdown from '../Forms/Dropdown';
import Helper from '../Helper';
import ActionTypes from '../../actions/ActionsTypes';
import { connect } from 'react-redux';
import $ from 'jquery';
import SimpleLoader from '../widget/SimpleLoader';
class NewAccountPopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoadingType:false,
            data:{
                client_type: parseInt(props.defaultCompanyType)
            },
            accountTypes:[],
            userList:[],
            stateList:[]
        }
    }
    componentDidMount(){
        this.loadAccountTypes()
        this.loadCountry()
        this.loadState()
    }
    loadCountry(){
        let api = Api;
        api.setUserToken();
        let that = this;
        api.axios().get('/locations/country').then(res => {
            that.props.setCountry(res.data)
        })
    }
    loadState(){
        let api = Api;
        api.setUserToken();
        let that = this;
        api.axios().get('/locations/state').then(res => {
            that.props.setState(res.data)
        })
    }
    countryChangeHandler(event){
        let allState = [];
        this.props.location.state.forEach(element => {
            if(element.country_id == event.target.value){
                allState.push(element);
            }
        });
        let oldData = this.state.data;
        this.setState({
            data:{
                ...oldData,
                [event.target.name]:event.target.value,
            },
            stateList:allState
        })
        
    }
    loadAccountTypes(){
        let api = Api;
        let that = this;
        that.setState({
            isLoadingType:true
        })
        api.axios().get('/account-types').then(res => {
            that.setState({
                isLoadingType:false,
                accountTypes:res.data.data
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
    onSaveHandler(e,isClose){
        let data = this.state.data;
        data.device_name = "web"
        let api = Api;
        api.setUserToken();
        let that =this;
        api.axios().post('/account/create',data).then(res=>{
            Helper.alert(res.data.message,{className:res.data.status ? 'success' : 'error'})
            if(res.data.status === true){
                that.setState({
                    data:{}
                })
                if(isClose){
                    $('.popup_container .popup_close').trigger('click')
                }
            }
            
        })
        
    }
    render() {
        let accountTypesOption = this.state.accountTypes.map( item => {
            return {
                label:item.name,
                value:item.id
            }
        })
        
        let data = this.state.data;
        let countryOptions = this.props.location.country.map( item => { return {label: item.name,value:item.id}});
        let stateOptions = this.state.stateList.map( item => { return {label:item.name,value:item.id}});
        if(this.state.isLoadingType){
            return <Popup {...this.props} width="700px" onClose = { this.props.onClose }><SimpleLoader/></Popup>
        }
        return (
            <Popup {...this.props} width="700px" onClose = { this.props.onClose }>
                <div className='new_account_popup'>
                    <h2 className='title'>Create Company</h2>
                    <div className='row'>
                        <Dropdown wraperClass="col-xs-12 col-md-12" name="client_type" label="Company Type" options={accountTypesOption} value={data.client_type} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-12"  name="company_name" label="Company name" value={data.company_name} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-4"  name="contact_name" label="Contact name" value={data.contact_name} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-4"  name="title" label="Title" value={data.title} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-4"  name="office_phone_number" label="Contact number" value={data.office_phone_number} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-6"  name="email" label="Email" value={data.email} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-6" name="website" label="Website" value={data.website} onChange = {this.onChangeHandler.bind(this)}/>
                        
                        <Input wraperClass="col-xs-12 col-md-12"  name="address" label="Address" inputType="textarea" value={data.address} onChange = {this.onChangeHandler.bind(this)}/>
                        <Dropdown name="country" label="Country" wraperClass="col-md-4" value={data.country} onChange={this.countryChangeHandler.bind(this)} options={countryOptions}  />
                        <Dropdown name="state" label="State" wraperClass="col-md-4" value={data.state} onChange={this.onChangeHandler.bind(this)} options={stateOptions}  />
                        <Input name="city" label="City" wraperClass="col-md-4" value={data.city} onChange={this.onChangeHandler.bind(this)}   />
                        <Input name="zipcode" wraperClass="col-md-4" label="Zip code" value={data.zipcode} onChange = {this.onChangeHandler.bind(this)} />
                        <Input name="suitno" wraperClass="col-md-4" label="Suite no" value={data.suitno} onChange = {this.onChangeHandler.bind(this)} />
                        
                        <Input wraperClass="col-xs-12 col-md-12"  name="notes" label="Notes" inputType="textarea" value={data.notes} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-6" name="naics_code" label="NAICS Code" value={data.naics_code} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-6" name="industry_type" label="Industry type" value={data.industry_type} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-6" name="sub_industry_type" label="Sub-industry type" value={data.sub_industry_type} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-6" name="contact_owner"   label="Contact owner" value={data.contact_owner} onChange = {this.onChangeHandler.bind(this)}/>
                        <div className='col-xs-12'>
                            <h4 className='title'>Social Links</h4>
                        </div>
                        <Input wraperClass="col-xs-12 col-md-4" name="facebook" label="Facebook" value={data.facebook} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input wraperClass="col-xs-12 col-md-4"  name="twitter" label="Twitter" value={data.twitter} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input  wraperClass="col-xs-12 col-md-4"  name="linkedin" label="LinkedIn" value={data.linkedin} onChange = {this.onChangeHandler.bind(this)}/>
                    </div>
                    <div className='d-flex gap-3'>

                        <Button onClick={ e => this.onSaveHandler(e,false)} title="Save & create new" className="btn_blue"/>
                        <Button onClick={ e => this.onSaveHandler(e,true)} title="Save & close" className="ml-5"/>
                    </div>
                </div>
                
            </Popup>
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
export default connect(mapStateToProps,mapDispatchToProps)(NewAccountPopup);