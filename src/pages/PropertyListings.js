import React, { Component } from 'react';
import Button from '../components/Forms/Button';
import RsWithRouter from '../components/Inc/RsWithRouter';
import MasterComponent from '../components/Layout/MasterComponent';
import CreateProperty from '../components/Property/CreateProperty';
import PropertyArchive from '../components/Property/PropertyArchive';

class PropertyListings extends Component {
    displayPage(propertyId){
        if(propertyId == 'all' || !propertyId){
            return <PropertyArchive/>
        }else if(propertyId == 'create'){
            return <CreateProperty/>
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