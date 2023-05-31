import React, { Component } from 'react';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';
import Button from '../Forms/Button';
import CompanyEditFormShort from './CompanyEditFormShort';

class CompanyDetailsTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            company:{},
            id:this.props.id,
            isLoading:false,
            isEditing:false
        }
    }
    componentDidMount(){
        if(this.props.details){
            this.setState({
                company:this.props.details,
                id:this.props.details.id
            })
        }else{
            this.laodCompany()
        }
    }
    laodCompany(){
        let api = Api,that = this;
        api.setUserToken();
        that.setState({
            isLoading:true,
            company:{}
        })
        api.axios().get('/account/get-by-id/'+this.state.id).then(res => {
            if(res.data.status){
                that.setState({
                    isLoading:false,
                    company:res.data.data
                })
            }
        })
    }
    onSaveSuccess(res){
        this.setState({
            isEditing:false
        })
        this.laodCompany()
    }
    onEditClickHandler(){
        this.setState({
            isEditing:true
        })
    }
    getForm(company){
        return <CompanyEditFormShort id = {company.id} onSaveSuccess={this.onSaveSuccess.bind(this)}/>
    }
    getViewMode(company){
        return(
            <>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td style={{width:'150px'}}>Name</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.company_name}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Contact name</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.contact_name}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Office phone</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.office_phone_number}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Email</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.email}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Website</td>
                            <td style={{width:'10px'}}>:</td>
                            <td><a href="{company.website}">{company.website}</a></td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Address</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.address}</td>
                        </tr>
                    </tbody>
                </table>
                <Button title="Edit" onClick={ this.onEditClickHandler.bind(this)}/>
            </>
        )
    }
    render() {
        if(this.state.isLoading){
            return <SimpleLoader/>
        }
        let company = this.state.company;
        return (
            <div className='company_deatils_tab'>
                {this.state.isEditing ? this.getForm(company) : this.getViewMode(company)}
            </div>
        );
    }
}

export default CompanyDetailsTab;