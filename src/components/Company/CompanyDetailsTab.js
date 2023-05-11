import React, { Component } from 'react';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';

class CompanyDetailsTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            company:{},
            id:this.props.id,
            isLoading:false
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
    render() {
        if(this.state.isLoading){
            return <SimpleLoader/>
        }
        let company = this.state.company;
        return (
            <div className='company_deatils_tab'>
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
            </div>
        );
    }
}

export default CompanyDetailsTab;