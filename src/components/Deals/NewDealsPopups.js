import React, { Component } from 'react';
import Api from '../Api';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Popup from '../widget/Popup';
import Dropdown from '../Forms/Dropdown';
import Helper from '../Helper';
import { connect } from 'react-redux';

class NewDealsPopups extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{},
            accountTypes:[],
            clients:[],
            property:[]
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
    render() {
        let accountTypesOption = this.state.accountTypes.map( item => {
            return {
                label:item.name,
                value:item.id
            }
        })
        let deal_stagesOption = this.props.dealStage.stage.map( item => {
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
        return (
            <Popup {...this.props} width="480px" onClose = { this.props.onClose }>
                <div className='new_account_popup'>
                    <h2 className='title'>Create Deal</h2>
                    <Input name="name" label="Deal title / Name" value={data.name} onChange = {this.onChangeHandler.bind(this)}/>
                    <Dropdown name="deal_type" label="Deal Type" id="deal_type" options={accountTypesOption} value={data.deal_type} onChange = {this.onChangeHandler.bind(this)}/>
                    <Dropdown name="deal_stage" label="Deal Stage" id="deal_stage" options={deal_stagesOption} value={data.deal_stage} onChange = {this.onChangeHandler.bind(this)}/>
                    <Dropdown name="deal_with_company" label="Deal With Client" id="deal_with_company" options={clients} value={data.deal_with_company} onChange = {this.onChangeHandler.bind(this)}/>
                    <Dropdown name="property" label="Deal With Property" id="deal_property" options={property} value={data.property} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="agreement_starting_date" label="Agreement Starting Date" value={data.agreement_starting_date} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="agreement_length" label="Agreement Length" value={data.agreement_length} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input name="agreement_end" label="Agreement End Date" value={data.agreement_end} onChange = {this.onChangeHandler.bind(this)}/>
                    <Button onClick={ e => this.onSaveHandler(e)} title="Save" className="btn_blue"/>
                </div>
                
            </Popup>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        dealStage:state.dealStage,
        accountType:state.accountType
    }
}
export default connect(mapStateToProps) (NewDealsPopups);