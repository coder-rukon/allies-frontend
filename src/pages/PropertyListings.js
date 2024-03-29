import React, { Component } from 'react';
import Button from '../components/Forms/Button';
import RsWithRouter from '../components/Inc/RsWithRouter';
import MasterComponent from '../components/Layout/MasterComponent';
import CreateProperty from '../components/Property/CreateProperty';
import PropertyArchive from '../components/Property/PropertyArchive';
import EditProperty from '../components/Property/EditProperty';
import AccessLevels from '../components/AccessLevel/AccessLevels';

class PropertyListings extends Component {
    displayPage(propertyId){
        if(propertyId == 'all' || !propertyId){
            return <PropertyArchive {...this.props}/>
        }else if(propertyId == 'create'){
            return <CreateProperty  {...this.props}/>
        }else{
            return(
                <>
                    <EditProperty  {...this.props} id={propertyId} />
                    <div className='container'>
                        <h2 className='section_title'>Team Access</h2>
                        <AccessLevels source="property" integrator={propertyId }/>
                    </div>
                </>
            )
        }
    }
    render() {
        let propertyId = this.props.rs_router.params.id ? this.props.rs_router.params.id : null;
        return (
            <div className='property_page'>
                
                {
                    this.displayPage(propertyId)
                }
            </div>
        );
    }
}

export default MasterComponent( RsWithRouter(PropertyListings) );