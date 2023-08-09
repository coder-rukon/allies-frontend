import React, { Component } from 'react';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Dropdown from '../Forms/Dropdown';
import Api from '../Api';
import Helper from '../Helper';
import Alert from '../widget/Alert';
import DisplayErrors from '../widget/DisplayErrors';
import SimpleLoader from '../widget/SimpleLoader';
import Settings from '../Settings';
import ActionTypes from '../../actions/ActionsTypes';
import { connect } from 'react-redux';

class CreateProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property:{},
            property_type:null,
            listing_type:null,
            property_types:[],
            stateList:[],
            errors:{},
            isLoading:false
        }
    }
    componentDidMount(){
        this.loadPropertyTypes();
        this.loadAllCountry();
        this.loadState();
    }
    loadState(){
        let api = Api;
        api.setUserToken();
        let that = this;
        api.axios().get('/locations/state').then(res => {
            that.props.setState(res.data)
        })
    }
    loadAllCountry(){
        let api = Api;
        api.setUserToken();
        let that = this;
        api.axios().get('/locations/country').then(res => {
            that.props.setCountry(res.data)
        })
    }
    loadPropertyTypes(){
        let api = Api;
        let that = this;
        that.setState({
            isLoading:true
        })
        api.setUserToken();
        api.axios().get(Settings.apiUrl+'/property/property-types').then(res=>{
            that.setState({
                isLoading:false,
                property_types:res.data.data
            }) 
        })
    }
    
    onSaveHandler(){
        let that = this;
        that.setState({
            errors:{},
            isLoading:true
        })
        let data = this.state.property;
        let api = Api;
        api.setUserToken();
        api.axios().post('/property/create',data).then(res => {
            if(res.data.status){
                that.setState({
                    isLoading:false,
                    property:{},
                    errors: {}
                })
                Helper.alert(res.data.message)
            }else{
               
                that.setState({
                    isLoading:false,
                    errors: res.data.message
                })
                Helper.alert("Errors found!",{className:'error'})
            }
        })
    }
    onChangeHanlder(event){
        this.setState({
            property:{
                ...this.state.property,
                [event.target.name]:event.target.value
            }
        })
    }
    onChangeCountry(event){
        this.setState({
            property:{
                ...this.state.property,
                [event.target.name]:event.target.value
            }
        })
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
    getFieldProps(field){
        let propsList = {
            onChange:this.onChangeHanlder.bind(this),
        }
        if(field.inputType == 'dropdown'){
            if(field.name == 'country'){
                propsList.options = this.props.location.country.map( item => { return {label: item.name,value:item.id}});
                propsList.onChange = this.onChangeCountry.bind(this);
            }
            else if(field.name == 'state'){
                propsList.options =  this.state.stateList.map( item => { return {label:item.name,value:item.id}});
                //propsList.onChange = this.onChangeCountry.bind(this);
            }
            else{
                if(propsList.options){
                    propsList.options = field.options;
                }
            }
        }
        return propsList;
    }
    getField(pField){
        let property = this.state.property;
        if(!this.isExistField(pField.name)){
            return <></>
        }
        if(pField.inputType =='dropdown'){
            return <div className={ pField.inputWraperClass ? pField.inputWraperClass : 'col-xs-12 col-sm-4'}><Dropdown {...pField} options={[]} {...this.getFieldProps(pField)}  name={pField.name} label={pField.label} value={property[pField.name]} /></div>
        }
        return <div className={ pField.inputWraperClass ? pField.inputWraperClass : 'col-xs-12 col-sm-4'}><Input {...pField} {...this.getFieldProps(pField)} name={pField.name} label={pField.label} value={property[pField.name]} /></div>
    }
    isExistField(name){
        let property_type = this.state.property_type;
        let listing_type = this.state.listing_type;
        if(!property_type || !listing_type ){
            return false;
        }
        let property_typeObj = {};
        this.state.property_types.forEach(pType => {
            if(pType.property_type_id == property_type){
                property_typeObj = pType;
            }
        })
        let fields = ( listing_type == 'for_sale' ?  property_typeObj.property_fields : property_typeObj.property_fields_for_lease);
        if(fields){
            fields = fields.split(',');
        }else{
            fields = [];
        }
        return fields.includes(name)
    }
    onListingTypeChangeHanlder(event){
        this.setState({
            listing_type:event.target.value
        })
    }
    onPropertyTypeChangeHandler(event){
        this.setState({
            property_type:event.target.value
        })
    }
    render() {
        let property = this.state.property;
        if(this.state.isLoading){
            return <SimpleLoader/>
        }
        let propertyTypes = this.state.property_types;
        let listingTypeOptions = [
            {label:'For sale',value:'for_sale'},
            {label:'For Lease',value:'for_lease'},
        ]
        let statusOptions = Helper.getPropertyStatus();
        let propertyFields = Helper.getPropertyFields();
        console.log(this.props.location.country)
        return (
            <div className='property_create_page'>
                <div className='container'>
                    <div className='property_form'>
                        <DisplayErrors errors={this.state.errors}/>
                        <div className='d-flex gap-4'>
                            {
                                propertyTypes.map( pType => {
                                    return <div><Input id={'pro_type_'+pType.property_type_id} onChange={ this.onPropertyTypeChangeHandler.bind(this)} name="property_type" inputClassName={"radio_input"} inputType="radio" value={pType.property_type_id} label={pType.name}/></div>
                                })  
                            }
                        </div>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-6'>
                                <Dropdown label="Listing Type" value={this.state.listing_type} options={listingTypeOptions} id="listing_type" onChange={this.onListingTypeChangeHanlder.bind(this)}/>
                            </div>
                            <div className='col-xs-12 col-sm-6'>
                                <Dropdown label="Status" value={property.status} name="status" options={statusOptions} id="status" onChange={this.onChangeHanlder.bind(this)}/>
                            </div>
                        </div>
                        <div className='row'>
                            {
                                propertyFields.map( pField => {
                                    return this.getField(pField)
                                })
                            }
                        </div>
                        <div className='d-flex gap-2'>
                            <Button  title="Save & Exit" className="primary_border" onClick={ this.onSaveHandler.bind(this) }/>
                            <Button  title="Save & Create New" className="primary_border" onClick={ this.onSaveHandler.bind(this) }/>
                            <Button  title="Link to Company" className="primary_border" onClick={ this.onSaveHandler.bind(this) }/>
                        </div>
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
export default connect(mapStateToProps,mapDispatchToProps)( CreateProperty );