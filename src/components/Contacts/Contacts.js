import React, { Component } from 'react';
import Contact from './Contact';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Helper from '../Helper';
import Dropdown from '../Forms/Dropdown';

class Contacts extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            contact:{},
            visibleForm:false,
            contacts:[]
        }
    }
    componentDidMount(){
        this.loadContacts();
    }
    loadContacts(){
        let api = Api;
        api.setUserToken();
        let that = this;
        that.setState({
            isLoading:true,
            contacts:[]
        })
        api.axios().get('/contact/get/'+this.props.source+'/'+this.props.integrator).then(res =>{
            that.setState({
                isLoading:false,
                contacts:res.data.data
            })
        })
    }
    onChangeHandler(e){
        let oldContact = this.state.contact;
        this.setState({
            contact:{
                ...oldContact,
                [e.target.name]:e.target.value
            }
        })
    }
    onSaveHandler(event){
        let data = this.state.contact;
        
        let api = Api;
        let that = this;
        if(!data.contact_id){
            data.source = this.props.source;
            data.integrator = this.props.integrator;
            api.axios().post('/contact/create',data).then(res => {
                if(res.data.type){
                    Helper.alert(res.data.message)
                    that.setState({
                        visibleForm:false,
                        contact:{}
                    })
                    that.loadContacts()
                }
                
            })
        }else{
            api.axios().put('/contact/update',data).then(res => {
                if(res.data.type){
                    Helper.alert(res.data.message)
                    that.setState({
                        visibleForm:false,
                        contact:{}
                    })
                    that.loadContacts()
                }
            })
        }
        
    }
    getForm(){
        if(!this.state.visibleForm){
            return;
        }
        let contact = this.state.contact;
        return(
            <div className='contact_form'>
                <div className='row '>
                    <div className='col-xs-12 col-sm-3'>
                        <Input name="contact_name" label="Contact Name" value={contact.contact_name} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                    <div className='col-xs-12 col-sm-2'>
                        <Input name="office_phone" label="Office phone" value={contact.office_phone} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                    <div className='col-xs-12 col-sm-2'>
                        <Input name="cell_phone" label="Cell Phone" value={contact.cell_phone} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                    <div className='col-xs-12 col-sm-2'>
                        <Input name="email" label="Email" value={contact.email} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                    <div className='col-xs-12 col-sm-3'>
                        <Button title={contact.contact_id ? 'Update' : 'Create'} className="mt-3 mb-3" onClick={ this.onSaveHandler.bind(this)}/>
                    </div>
                </div>
            </div>
            
        )
    }
    render() {
        return (
            <div className='contacts_list_section'>
                {
                    this.state.isLoading ? <SimpleLoader /> : ''
                }
                <div className='contacts_lists'>
                    {this.getForm()}
                    { !this.state.visibleForm ? <div style={{textAlign:'right'}}><Button title="+" className="mb-3" onClick={e => { this.setState({visibleForm:true})}}/></div> : '' }
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td style={{width:'150px'}}>Contact Name</td>
                                <td>Office phone</td>
                                <td>Cell Phone</td>
                                <td>Email</td>
                                <td></td>
                            </tr>
                            {this.state.contacts.map( (contact,key) => {
                                return <Contact key={key} contact={contact}/>
                            })}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        );
    }
}

export default Contacts;