import React, { Component } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Dropdown from '../Forms/Dropdown';
import AlliesGrid from '../Grid/AlliesGrid';

class DealTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            member:{}
        }
    }

    onChangeHandler(r){

    }
    getForm(){
        let member = this.state.member;
        let access_levels = [
            {
                label:'Full',
                value:'full'
            },
            {
                label:'View only',
                value:'view_only'
            }
        ]
        return(
            <div className='member_form'>
                <div className='row '>
                    <div className='col-xs-12 col-sm-4'>
                        <Input name="email" label="Email" value={member.email} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                    <div className='col-xs-12 col-sm-2'>
                        <Dropdown name="access_level" label="Access level" value={member.access_level} options={access_levels} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                    <div className='col-xs-12 col-sm-4'>
                        <Button title={member.member_id ? 'Update' : 'Add'} className="mt-3 mb-3" onClick={ this.onSaveHandler.bind(this)}/>
                    </div>
                </div>
            </div>
            
        )
    }
    onSaveHandler (){

    }
    render() {
        let header = [
            {field:'email',headerName:"User Email", editable:false},
            {field:'name',headerName:"Full Name", editable:false},
            {field:'access',headerName:"Access Level", editable:false},
        ];
        let data = [{},{},{}]
        return (
            <div className='rs_deal_team'>
                {this.getForm()}
                <AlliesGrid header={header} data={data}/>
            </div>
        );
    }
}

export default DealTeam;