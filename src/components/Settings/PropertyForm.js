import React, { Component } from 'react';
import Api from '../Api';
import DisplayErrors from '../widget/DisplayErrors';
import Input from '../Forms/Input';
import Settings from '../Settings';
import Helper from '../Helper';
import Button from '../Forms/Button';
import SimpleLoader from '../widget/SimpleLoader';
import Checkbox from '../Forms/Checkbox';

class PropertyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            property_types:[],
            errors:{},
            selectedPropertyTypeId:null,
            selectedPropertyType:{}
        }
    }
    componentDidMount(){
        this.loadPropertyTypes();
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
    loadPropertyTypeById(){
        let api = Api;
        let that = this;
        that.setState({
            isLoading:true
        })
        api.setUserToken();
        api.axios().get(Settings.apiUrl+'/property/get-type/'+this.state.selectedPropertyTypeId).then(res=>{
            that.setState({
                isLoading:false,
                selectedPropertyType:res.data.data
            }) 
        })
    }
    onChangeHanlder(event){
        let that = this;
        this.setState({
            selectedPropertyTypeId:event.target.value
        }, () => {
            that.loadPropertyTypeById()
        })

    }
    isExistField(saleOrLease , name){
        if(!this.state.selectedPropertyType || !this.state.selectedPropertyType.property_type_id){
            return false;
        }
        let selectedPropertyType = this.state.selectedPropertyType;
        let fields = ( saleOrLease == 'sale' ?  selectedPropertyType.property_fields : selectedPropertyType.property_fields_for_lease);
        if(fields){
            fields = fields.split(',');
        }else{
            fields = [];
        }
        return fields.includes(name)
    }
    propertyFields(){
        let propertyFields = Helper.getPropertyFields();
        if(!this.state.selectedPropertyTypeId){
            return;
        }
        if(this.state.isLoading){
            return;
        }
        return(
            <form id="property_field_frm"  method="put" encType="multipart/form-data">
                 <h5>Fields For Sale</h5>
                    <div className='property_fields'>
                        {
                            propertyFields.map( pField => {
                                return <Checkbox inputType="checkbox" isChecked={this.isExistField('sale',pField.name)} inputClassName="form-check-input" name="for_sale[]" value={pField.name} label={pField.label} />
                            })
                        }
                    </div>
                    <h5>Fields For Lease</h5>
                    <div className='property_fields'>
                        {
                            propertyFields.map( pField => {
                                return <Checkbox inputType="checkbox" isChecked={this.isExistField('lease',pField.name)} inputClassName="form-check-input" name="for_lease[]" value={pField.name}  label={pField.label} />
                            })
                        }
                    </div>
            </form>
        )
    }
    saveHandler(e){
        let formData = new FormData(document.getElementById('property_field_frm'));
        formData.append('rs','2222');
        let api = Api;
        let that = this;
        that.setState({
            isLoading:true
        })
        api.setUserToken();
        //let data = Object.fromEntries(formData);
        let for_sale = formData.getAll('for_sale[]')
        let for_lease = formData.getAll('for_lease[]')
        let data = {
            for_sale:for_sale.toString(),
            for_lease:for_lease.toString(),
        }
        api.axios().put(Settings.apiUrl+'/property/property-type-fields/'+this.state.selectedPropertyTypeId,data).then(res=>{
            Helper.alert(res.data.message);
            that.loadPropertyTypeById();
            that.setState({
                isLoading:false
            })
        })
    }
    render() {
        let propertyTypes = this.state.property_types;
        
        return (
            <div className='property_page_settings'>

                <div className='container'>
                    <DisplayErrors errors={this.state.errors}/>
                    <h5>Property Type</h5>
                    <div className='d-flex gap-4'>
                        {
                            propertyTypes.map( pType => {
                                return <div><Input id={'pro_type_'+pType.property_type_id}  onChange={ this.onChangeHanlder.bind(this)} name="property_type" inputClassName={"radio_input"} inputType="radio" value={pType.property_type_id} label={pType.name}/></div>
                            })  
                        }
                    </div>
                    {
                        this.propertyFields()
                    }
                    {  this.state.isLoading ? <SimpleLoader /> : '' }
                    <Button title="Save" onClick = {this.saveHandler.bind(this)}/>
                </div>
                
            </div>
        );
    }
}

export default PropertyForm;