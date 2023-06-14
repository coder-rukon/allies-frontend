import React, { Component } from 'react';
import Input from '../Forms/Input';
import Dropdown from '../Forms/Dropdown';
import Button from '../Forms/Button';
import AlliesGrid from '../Grid/AlliesGrid';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';
import Helper from '../Helper';

class AccessLevels extends Component {
    constructor(props){
        super(props);
        this.state = {
            access:{
                access_level:'full_access'
            },
            isLoadingAccess:false,
            allAccessList:[]
        }
    }
    componentDidMount(){
        this.loadAccess();
    }
    loadAccess(){
        let api = Api;
        api.setUserToken();
        let that = this;
        this.setState({
            isLoadingAccess:true,
            allAccessList:[]
        })
        api.axios().post(`/access/get-users/${this.props.source}/${this.props.integrator}`).then(res => {
            
            that.setState({
                isLoadingAccess:false,
                allAccessList:res.data.data
            })
        })
    }
    onChangeHandler(event){
        let oldAccess = this.state.access;
        this.setState({
            access:{
                ...oldAccess,
                [event.target.name] : event.target.value
            }
        })
    }
    getForm(){
        let access = this.state.access;
        let access_levels = [
            {
                label:'Full Access',
                value:'full_access'
            }
        ]
        return(
            <div className='member_form'>
                <div className='row '>
                    <div className='col-xs-12 col-sm-4'>
                        <Input name="email" label="Email" value={access.email} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                    <div className='col-xs-12 col-sm-2'>
                        <Dropdown name="access_level" label="Access level" value={access.access_level} options={access_levels} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                    <div className='col-xs-12 col-sm-4'>
                        <Button title={access.member_id ? 'Update' : 'Add'} className="mt-3 mb-3" onClick={ this.onSaveHandler.bind(this)}/>
                    </div>
                </div>
            </div>
            
        )
    }
    onSaveHandler (event){
        let access = this.state.access;
        access.source = this.props.source;
        access.integrator = this.props.integrator;
        let api = Api;
        api.setUserToken();
        let that = this;
        api.axios().post('/access/create',access).then( res=>{
            Helper.alert(res.data.message,{className:res.data.type  ? 'success' : 'error'})
            if(res.data.type){
                that.setState({
                    access:{}
                })
                that.loadAccess();
            }
        })
    }
    onDeleteHandler(access_level_id){
        let api = Api;
        api.setUserToken();
        let that = this;
        api.axios().delete('/access/delete/'+access_level_id).then(res=>{
            Helper.alert(res.data.message,{className:res.data.type  ? 'success' : 'error'})
            if(res.data.type){
                that.loadAccess();
            }
        })
    }
    actionsbuttons(params){
        return(
            `<div class='access_actions'>
                <button class="btn rs_btn delete_btn">Remove access</button
            </div>`
        )
    }
    onCellClicked(params){
        if(params.colDef.field =='actions'){
            this.onDeleteHandler(params.data.access_level_id)
        }
    }
    render() {
        let header = [
            {field:'email',headerName:"User Email", editable:false},
            {field:'name',headerName:"Full Name", editable:false},
            {field:'access_level',headerName:"Access Level", editable:false},
            {field:'actions',headerName:"", editable:false, cellRenderer: this.actionsbuttons.bind(this)},
        ];
        let data = this.state.allAccessList;
        return (
            <div className='access_list'>
                {this.getForm()}
                { this.state.isLoadingAccess ? <SimpleLoader /> : <AlliesGrid onCellClicked={this.onCellClicked.bind(this)} header={header} data={data} height="300px"/> }
                
            </div>
        );
    }
}

export default AccessLevels;