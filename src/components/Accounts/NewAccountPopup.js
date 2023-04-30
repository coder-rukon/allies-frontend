import React, { Component } from 'react';
import Api from '../Api';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Lists from '../widget/Lists/Lists';
import Popup from '../widget/Popup';
import Dropdown from '../Forms/Dropdown';
import Helper from '../Helper';

class NewAccountPopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{},
            accountTypes:[],
            userList:[]
        }
    }
    componentDidMount(){
        this.loadAccountTypes()
        this.loadUsers()
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
    loadUsers(){
        let api = Api;
        let that = this;
        api.axios().get('/user-list').then(res => {
            that.setState({
                userList:res.data.data
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
        api.axios().post('/account/create',data).then(res=>{
            Helper.alert(res.data.message,{className:res.data.status ? 'success' : 'error'})
            if(res.data.status === true){
                that.setState({
                    data:{}
                })
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
        let userList = this.state.userList.map( item => {
            return {
                label:item.name,
                value:item.id
            }
        })
        let data = this.state.data;
        return (
            <Popup {...this.props} width="480px" onClose = { this.props.onClose }>
                <div className='new_account_popup'>
                    <h2 className='title'>Create Client</h2>
                    <Dropdown name="client_type" label="Account Type" options={accountTypesOption} value={data.client_type} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="company_name" label="Company name" value={data.company_name} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="contact_name" label="Contact name" value={data.contact_name} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="title" label="Title" value={data.title} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="office_phone_number" label="Contact number" value={data.office_phone_number} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="email" label="Email" value={data.email} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="address" label="Address" inputType="textarea" value={data.address} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="notes" label="Notes" inputType="textarea" value={data.notes} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="naics_code" label="NAICS Code" value={data.naics_code} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="industry_type" label="Industry type" value={data.industry_type} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="sub_industry_type" label="Sub-industry type" value={data.sub_industry_type} onChange = {this.onChangeHandler.bind(this)}/>
                    <Dropdown name="contact_owner"  options={userList}  label="Contact owner" value={data.contact_owner} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="website" label="Website" value={data.website} onChange = {this.onChangeHandler.bind(this)}/>
                    <h4 className='title'>Social Links</h4>
                    <Input name="facebook" label="Facebook"/>
                    <Input name="twitter" label="Twitter"/>
                    <Input name="linkedin" label="LinkedIn"/>
                    <Button onClick={ e => this.onSaveHandler(e)} title="Save" className="btn_blue"/>
                </div>
                
            </Popup>
        );
    }
}

export default NewAccountPopup;