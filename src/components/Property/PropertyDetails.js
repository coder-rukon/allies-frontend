import React, { Component } from 'react';

class PropertyDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            property:{}
        }
    }
    componentDidMount(){
        if(this.props.details){
            this.setState({
                property:this.props.details
            })
        }
    }
    render() {
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
                        <tr>
                            <td style={{width:'150px'}}>Status</td>
                            <td style={{width:'10px'}}>:</td>
                            <td>{property.address}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PropertyDetails;