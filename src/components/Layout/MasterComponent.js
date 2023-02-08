import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionTypes from '../../actions/ActionsTypes';
import MasterLayout from './MasterLayout';

const defaultDataLoad = {

}
const MasterComponent = (OuterComponent,dataLoad =defaultDataLoad) =>{
    class RsDataLoaderClass extends Component {
        constructor(props){
            super(props);
            this.state = {
                
            }
            this.isVendorLoaded = false;
        }
        componentDidMount(){
            
        }
       
        render() {
            if(dataLoad.vendors){
                this.props.dataLoaderProps.vendors = this.state.vendors;
            }
            return ( <MasterLayout  {...this.props}><OuterComponent {...this.props} /></MasterLayout>);
        }
    }
    
    const mapStateToProps = (state) => {
        return {
            dataLoaderProps:{
                
            }
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            dataLoaderPropsMethods: {
                setUser: (user) => { dispatch({type:ActionTypes.SET_USER, payload:user})},
            }
        }
    }

    return connect (mapStateToProps,mapDispatchToProps) ( RsDataLoaderClass );
}

export default MasterComponent;