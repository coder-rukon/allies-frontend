import React, { Component } from 'react';

class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            contact:{}
        }
    }
    componentDidMount(){
        this.setState({
            contact:this.props.contact
        })
    }
    render() {
        let contact = this.state.contact;
        return (
            <tr className='contact_item'>
                <td style={{width:'150px'}}>{contact.contact_name}</td>
                <td style={{width:'10px'}}>{contact.type}</td>
                <td>{contact.details}</td>
            </tr>
        );
    }
}

export default Contact;