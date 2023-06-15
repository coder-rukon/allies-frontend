import React, { Component } from 'react';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Dropdown from '../Forms/Dropdown';
import Api from '../Api';
import Helper from '../Helper';
import Alert from '../widget/Alert';
import DisplayErrors from '../widget/DisplayErrors';
import SimpleLoader from '../widget/SimpleLoader';

class CreateProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property:{},
            errors:{},
            isLoading:false
        }
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
    render() {
        let property = this.state.property;
        if(this.state.isLoading){
            return <SimpleLoader/>
        }
        let propertyTypes = Helper.getPropertyType()
        return (
            <div className='property_create_page'>
                <div className='secondery_header_wraper'>
                    <div className='container'>
                        <div className='secondery_header'>
                            <Button to={'/property/all'} title="Back To All Property" className="primary_border"/>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='property_form'>
                        <DisplayErrors errors={this.state.errors}/>
                        <Dropdown name="property_type" label="Property Type" value={property.property_type} onChange={ this.onChangeHanlder.bind(this)} options={ propertyTypes }/>

                        <Input name="name" label="Property Name" value={property.name} onChange={ this.onChangeHanlder.bind(this)}/>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-6'><Input name="size" label="Size"  value={property.size} onChange={ this.onChangeHanlder.bind(this)}/></div>
                            <div className='col-xs-12 col-sm-6'><Input name="zoning" label="Zoning"  value={property.zoning} onChange={ this.onChangeHanlder.bind(this)}/></div>
                        </div>
                        <Input name="land_area" label="Land area"  value={property.land_area} onChange={ this.onChangeHanlder.bind(this)}/>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-4'><Input name="dock_doors" label="Dock doors"  value={property.dock_doors} onChange={ this.onChangeHanlder.bind(this)}/></div>
                            <div className='col-xs-12 col-sm-4'><Input name="drive_in_doors" label="Drive in doors"  value={property.drive_in_doors} onChange={ this.onChangeHanlder.bind(this)}/></div>
                            <div className='col-xs-12 col-sm-4'><Input name="clear_height" label="Clear height"  value={property.clear_height} onChange={ this.onChangeHanlder.bind(this)}/></div>
                            <div className='col-xs-12 col-sm-4'><Input name="year_built" label="Year built"  value={property.year_built} onChange={ this.onChangeHanlder.bind(this)}/></div>
                            <div className='col-xs-12 col-sm-3'><Input name="property_value" label="Property value"  value={property.property_value} onChange={ this.onChangeHanlder.bind(this)}/></div>
                            <div className='col-xs-12 col-sm-3'><Input name="lease_value" label="Lease value"  value={property.lease_value} onChange={ this.onChangeHanlder.bind(this)}/></div>
                        </div>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-4'><Dropdown name="status" label="Status" value={property.status} onChange={ this.onChangeHanlder.bind(this)} options={[{label:'Available' , value:"available"},{label:'Not Available' , value:"not_available"}]}/></div>
                        </div>
                        <Button  title="Save" className="primary_border" onClick={ this.onSaveHandler.bind(this) }/>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default CreateProperty;