import React, { Component } from 'react';
import RsWithRouter from '../components/Inc/RsWithRouter';
import MasterComponent from '../components/Layout/MasterComponent';


class PropertyDetails extends Component {
    constructor(props){
        super(props);
        this.gridObj = null;
        this.state = {
            isLoading:false,
            status:'active',
            isPopupOpen:false
        }
    }
    
    render() {
        
        
        return (
            <div className="accounts_page">
                
            </div>
        );
    }
}

export default MasterComponent( RsWithRouter(PropertyDetails) );