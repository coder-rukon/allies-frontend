import React, { Component } from 'react';
import Button from '../../Forms/Button';

class DealContacts extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            isEditing:false
        }
    }
    loadCompanyDetails(id){

    }
    onSaveSuccess(res){
        this.setState({
            isEditing:false
        })
        this.loadCompanyDetails(1)
    }
    onEditClickHandler(){
        this.setState({
            isEditing:true
        })
    }

    getViewMode(client){
        return(
            <div className='view_mode_details'>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td style={{width:'150px'}}>Name</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{client.contact_name}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Phone</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{client.office_phone_number}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Email</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{client.email}</td>
                        </tr>
                        
                    </tbody>
                </table>
                <Button title="Edit" onClick={ this.onEditClickHandler.bind(this)}/>
            </div>
            
        )
    }
    getForm(company){
        return <p>Edit contact</p>
    }
    render() {
        let company = this.props.client;
        return (
            <div className='company_deatils_tab'>
                {this.state.isEditing ? this.getForm(company) : this.getViewMode(company)}
            </div>
        );
    }
}

export default DealContacts;