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
            isEditing:true
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
        let meta = company && company.meta ? JSON.parse(company.meta) : {};
        console.log(meta,'company.meta')
        let social = meta.social ? meta.social : {};
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
                            <td style={{width:'150px'}}>Title</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.title}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Contact owner</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.contact_owner}</td>
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
                            <td style={{width:'150px'}}>Country</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.country}</td>
                        </tr>
                        
                        <tr>
                            <td style={{width:'150px'}}>State</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.state}</td>
                        </tr>
                        
                        <tr>
                            <td style={{width:'150px'}}>City</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.city}</td>
                        </tr>
                        
                        <tr>
                            <td style={{width:'150px'}}>Zip code</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.zipcode}</td>
                        </tr>
                        
                        <tr>
                            <td style={{width:'150px'}}>Suite no </td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.suitno}</td>
                        </tr>


                        <tr>
                            <td style={{width:'150px'}}>Address</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.address}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Naics code</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.naics_code}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Industry type</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.industry_type}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Sub industry type</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.sub_industry_type}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Notes</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{company.notes}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Facebook</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{social.facebook}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Twitter</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{social.twitter}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Linkedin</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{social.linkedin}</td>
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