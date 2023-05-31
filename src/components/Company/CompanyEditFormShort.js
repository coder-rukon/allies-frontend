import React, { Component } from 'react';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';
import Input from '../Forms/Input';
import Dropdown from '../Forms/Dropdown';
import Button from '../Forms/Button';
import Helper from '../Helper';
import { connect } from 'react-redux';
import ActionTypes from '../../actions/ActionsTypes';
import Settings from '../Settings';

class CompanyEditFormShort extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            social:{},
            company:{},
            cityList:[],
            stateList:[],
        }
    }
    componentDidMount(){
        this.laodCompany()
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
    laodCompany(){
        let api = Api,that = this;
        api.setUserToken();
        that.setState({
            isLoading:true,
            company:{},
            social:{}
        })
        api.axios().get('/account/get-by-id/'+this.props.id).then(res => {
            if(res.data.status){
                let meta = JSON.parse(res.data.data.meta);
                that.setState({
                    isLoading:false,
                    company:res.data.data,
                    social:meta.social ? meta.social : {}
                })
            }
        })
    }
    onChangeHandler(e){
        let oldCompany = this.state.company;
        this.setState({
            company:{
                ...oldCompany,
                [e.target.name]:e.target.value
            }
        })
    }
    onSaveHandler(){
        let api = Api;
        api.setUserToken();
        let data = this.state.company;
        data.device_name="web";
        data.social=this.state.social;
        api.axios().put('/account/update/'+data.id,data).then(res => {
            Helper.alert(res.data.message)
        })
        if(this.props.onSaveSuccess){
            this.props.onSaveSuccess()
        }
    }
    onSocialChange(event){
        let socialData = this.state.social;
        this.setState({
            social:{
                ...socialData,
                [event.target.name]:event.target.value
            }
        })
    }
    countryChangeHandler(event){
        let allState = [];
        this.props.location.state.forEach(element => {
            if(element.country_id == event.target.value){
                allState.push(element);
            }
        });
        this.setState({
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
        this.setState({
            cityList:allCity
        })
    }
    cityChangeHandler(event){}
    render() {
        if(this.state.isLoading){
            return <SimpleLoader/>
        }

        let data =this.state.company;
        let countryOptions = this.props.location.country.map( item => { return {label: item.name,value:item.id}});
        let stateOptions = this.state.stateList.map( item => { return {label:item.name,value:item.id}});
        let cityOptions = this.state.cityList.map( item => { return {label:item.name,value:item.id}});
        return (
            <div className='company_edit_form'>
                <Input name="company_name" label="Company name" value={data.company_name} onChange = {this.onChangeHandler.bind(this)}/>
                <div className='row'>
                    <Input name="contact_name" wraperClass="col-md-4" label="Contact name" value={data.contact_name} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="title" wraperClass="col-md-4" label="Title" value={data.title} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="office_phone_number" wraperClass="col-md-4" label="Contact number" value={data.office_phone_number} onChange = {this.onChangeHandler.bind(this)}/>
                </div>
                <Input name="email" label="Email" value={data.email} onChange = {this.onChangeHandler.bind(this)}/>
                <div className='row'>
                    <Dropdown name="country" label="Country" wraperClass="col-md-3" value={data.country} onChange={this.countryChangeHandler.bind(this)} options={countryOptions} />
                    <Dropdown name="state" label="State" wraperClass="col-md-3" value={data.state} onChange={this.stateChangeHandler.bind(this)} options={stateOptions} />
                    <Dropdown name="city" label="City" wraperClass="col-md-3" value={data.city} onChange={this.cityChangeHandler.bind(this)}  options={cityOptions} />
                    <Input name="zipcode" wraperClass="col-md-3" label="Zip code" value={data.zipcode} onChange = {this.onChangeHandler.bind(this)}/>
                </div>
                <div className='row'>
                    <Input name="address" wraperClass="col-md-6" label="Address" inputType="textarea" value={data.address} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="notes" wraperClass="col-md-6" label="Notes" inputType="textarea" value={data.notes} onChange = {this.onChangeHandler.bind(this)}/>
                </div>
                <div className='row'>
                    <Input name="naics_code" wraperClass="col-md-4" label="NAICS Code" value={data.naics_code} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="industry_type" wraperClass="col-md-4" label="Industry type" value={data.industry_type} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="sub_industry_type" wraperClass="col-md-4" label="Sub-industry type" value={data.sub_industry_type} onChange = {this.onChangeHandler.bind(this)}/>
                </div>
                <Input name="website" label="Website" value={data.website} onChange = {this.onChangeHandler.bind(this)}/>
                <h4 className='title'>Social Links</h4>
                <div className='row'>
                    <Input name="facebook" value={this.state.social.facebook} onChange={event => { this.onSocialChange(event) } } wraperClass="col-md-4" label="Facebook"/>
                    <Input name="twitter" value={this.state.social.twitter} onChange={event => { this.onSocialChange(event) } }  wraperClass="col-md-4" label="Twitter"/>
                    <Input name="linkedIn" value={this.state.social.linkedIn} onChange={event => { this.onSocialChange(event) } }  wraperClass="col-md-4" label="LinkedIn"/>
                </div>
                <Button onClick={ e => this.onSaveHandler(e)} title="Save" className="primary_border"/>
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
export default connect(mapStateToProps,mapDispatchToProps) (CompanyEditFormShort);