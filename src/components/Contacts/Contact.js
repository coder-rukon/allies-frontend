import React, { Component } from 'react';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';

class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            isDeleted:false,
            contact:{}
        }
    }
    componentDidMount(){
        this.setState({
            contact:this.props.contact
        })
    }
    delete(e){
        let api = Api;
        api.setUserToken();
        let that = this;
        this.setState({
            isLoading:true
        })
        api.axios().delete('/contact/delete/'+this.state.contact.contact_id).then(res=> {
            that.setState({
                isLoading:false,
                isDeleted:true
            })
        })
    }
    render() {
        let contact = this.state.contact;
        if(this.state.isDeleted){
            return <></>
        }
        return (
            <tr className='contact_item'>
                <td style={{width:'150px'}}>{contact.contact_name}</td>
                <td>{contact.office_phone}</td>
                <td>{contact.cell_phone}</td>
                <td>{contact.email}</td>
                <td>{this.state.isLoading ? <SimpleLoader/> : <img onClick={this.delete.bind(this)} className='del_btn_icon' src="/images/icon-delete.png" alt='' />}</td>
            </tr>
        );
    }
}

export default Contact;