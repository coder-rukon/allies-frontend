import React, { Component } from 'react';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Dropdown from '../Forms/Dropdown';
import Api from '../Api';
import Helper from '../Helper';
import DisplayErrors from '../widget/DisplayErrors';
import SimpleLoader from '../widget/SimpleLoader';
import Alert from '../widget/Alert';

class EditProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property:{},
            errors:{},
            notFound:false,
            isLoading:false
        }
    }
    componentDidMount(){
        this.loadProperty()
    }
    loadProperty(){
        this.setState({
            isLoading:true,
            property:{},
            notFound:false,
            errors:{},
        })
        let id = this.props.id,that = this;
        let api = Api;
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
    onSaveHandler(){
        let that = this;
        let id = this.props.id;
        that.setState({
            errors:{},
            isLoading:true
        })
        let data = this.state.property;
        let api = Api;
        api.setUserToken();
        api.axios().put('/property/update/'+id,data).then(res => {
            if(res.data.status){
                that.setState({
                    isLoading:false,
                    property:res.data.data,
                    errors: {}
                })
                Helper.alert(res.data.message)
                if(that.props.onSaveSuccess){
                    that.props.onSaveSuccess(res)
                }
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
    deleteHandler(){
        let that = this;
        let id = this.props.id;
        that.setState({
            isLoading:true
        })
        let api = Api;
        api.setUserToken();
        api.axios().delete('/property/delete/'+id).then(res => {
            if(res.data.status){
                that.setState({
                    isLoading:false,
                })
                Helper.alert(res.data.message)
                that.props.rs_router.navigate('/property/all')
            }else{
                that.setState({
                    isLoading:false,
                })
                Helper.alert(res.data.message,{className:'error'})
            }
        })
    }
    getHeader(){
        if(this.props.hideHeader){
            return <></>
        }
        return(
            <div className='secondery_header_wraper'>
                <div className='container'>
                    <div className='secondery_header'>
                        <Button to={'/property/all'} title="Back To All Projects" className="primary_border"/>
                        <Button  title="Delete" onClick={ this.deleteHandler.bind(this)} className="danger"/>
                    </div>
                </div>
            </div>
        )
    }
    getForm(){
        let property = this.state.property;
        return(
            <div className='property_form'>
                <DisplayErrors errors={this.state.errors}/>
                <Input name="name" label="Project Name" value={property.name} onChange={ this.onChangeHanlder.bind(this)}/>
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
        )
    }
    render() {
        let property = this.state.property;
        if(this.state.isLoading){
            return <SimpleLoader/>
        }
        if(this.state.notFound){
            return <div className='container mt-3'><Alert type="danger">404!</Alert></div>
        }
        if(this.props.onlyForm){
            return this.getForm();
        }
        return (
            <div className='property_create_page'>
                { this.getHeader() }
                <div className='container'>
                    {this.getForm()}
                </div>
                
            </div>
        );
    }
}

export default EditProperty;