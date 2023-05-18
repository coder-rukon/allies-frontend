import React, { Component } from 'react';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';
import Input from '../Forms/Input';
import Dropdown from '../Forms/Dropdown';
import Button from '../Forms/Button';

class CompanyEditForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            company:{}
        }
    }
    laodCompany(){
        let api = Api,that = this;
        api.setUserToken();
        that.setState({
            isLoading:true,
            company:{}
        })
        api.axios().get('/account/get-by-id/'+this.props.id).then(res => {
            if(res.data.status){
                that.setState({
                    isLoading:false,
                    company:res.data.data
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
        if(this.props.onSaveSuccess){
            this.props.onSaveSuccess()
        }
    }
    render() {
        if(this.state.isLoading){
            return <SimpleLoader/>
        }
        let accountTypesOption = []
        let userList = []
        let data =this.state.company;
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
                    <Input name="address" wraperClass="col-md-6" label="Address" inputType="textarea" value={data.address} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="notes" wraperClass="col-md-6" label="Notes" inputType="textarea" value={data.notes} onChange = {this.onChangeHandler.bind(this)}/>
                </div>
                <div className='row'>
                    <Input name="naics_code" wraperClass="col-md-4" label="NAICS Code" value={data.naics_code} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="industry_type" wraperClass="col-md-4" label="Industry type" value={data.industry_type} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="sub_industry_type" wraperClass="col-md-4" label="Sub-industry type" value={data.sub_industry_type} onChange = {this.onChangeHandler.bind(this)}/>
                </div>
                <h4 className='title'>Social Links</h4>
                <div className='row'>
                    <Input name="facebook" wraperClass="col-md-4" label="Facebook"/>
                    <Input name="twitter" wraperClass="col-md-4" label="Twitter"/>
                    <Input name="linkedin" wraperClass="col-md-4" label="LinkedIn"/>
                </div>
                <Button onClick={ e => this.onSaveHandler(e)} title="Save" className="primary_border"/>
            </div>
        );
    }
}

export default CompanyEditForm;