import React, { Component } from 'react';
import Button from '../Forms/Button';
import EditProperty from './EditProperty';
import Api from '../Api';

class PropertyDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditingMode:false,
            property:{},
            isLoading:false
        }
    }
    componentDidMount(){
        if(this.props.details){
            this.setState({
                property:this.props.details
            })
        }
    }
    loadProperty(id){
        this.setState({
            isLoading:true,
        })
        let that = this;
        let api = Api;
        api.setUserToken();
        api.axios().get('/property/get/'+id).then(res=>{
            if(res.data.status){
                that.setState({
                    isLoading:false,
                    property:res.data.data,
                })
            }else{
                that.setState({
                    isLoading:false,
                    property:{},
                })
            }
            
        })
    }
    onEditBtnHanlder(){
        this.setState({
            isEditingMode:true
        })
    }
    onSaveSuccess(res){
        this.setState({
            isEditingMode:false
        })
        this.loadProperty(this.state.property.id)
    }
    viewOnlyMode(){
        let property = this.state.property;
        return (
            <div className='property_deatils_tab'>
                <table className="table table-striped">
                
                    <tbody>
                        <tr>
                            <td style={{width:'150px'}}>Project Name</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.name}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Size</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.size}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Zoning</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.zoning}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Land area</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.land_area}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Dock doors</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.dock_doors}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Drive in doors </td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.company_type?property.drive_in_doors : ''}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Clear height </td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.clear_height}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Year built </td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.year_built}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Property value </td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.property_value}</td>
                        </tr>
                        <tr>
                            <td style={{width:'150px'}}>Lease value </td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.lease_value}</td>
                        </tr>
                        
                    </tbody>
                </table>
                <Button title="Edit Property" onClick={ this.onEditBtnHanlder.bind(this)} />
            </div>
        );
    }
    getForm(){
        let property = this.state.property;
        return <EditProperty id={property.id} onlyForm={true} onSaveSuccess = {this.onSaveSuccess.bind(this)}/>
    }
    render() {
        return(
            <div className=''>

                {this.state.isEditingMode ? this.getForm() : this.viewOnlyMode()}
            </div>
        )
    }
}

export default PropertyDetails;