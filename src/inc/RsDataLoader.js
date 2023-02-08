import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionTypes from '../../inc/ActionsTypes';
import Api from '../../inc/Api';
import Settings from '../../inc/Settings';
const defaultDataLoad = {

}
const RsDataLoader = (OuterComponent,dataLoad =defaultDataLoad) =>{
    class RsDataLoaderClass extends Component {
        constructor(props){
            super(props);
            this.isVendorLoaded = false;
            this.api = Api;
            this.api.setUserToken();
            this.settings = Settings;
            this.addressPurposeCalled = false;
            this.state = {
                vendors:[]
            }
        }
        componentDidMount(){
            if(dataLoad.purpose){   
                this.addressPurpose();
            }
            if(dataLoad.vendors){
                this.loadVendors();
            }
        }
        loadVendors(){
            if(this.isVendorLoaded){
                return;
            }
            this.isVendorLoaded = true;
            let that = this;
            this.api.axios().get(Settings.apiVendorUrl + '/vendor').then(res => {
                that.setState({
                    vendors: res.data.data
                })
            })
        }
        addressPurpose(){
            
            let that  = this;
            let dataLoaderProps = this.props.dataLoaderProps;
            let dataLoaderPropsMethods = this.props.dataLoaderPropsMethods;
            if(dataLoaderProps.purpose.purpose.length <=0 && !this.addressPurposeCalled){
                this.addressPurposeCalled = true;
                this.api.axios().get(this.settings.apiUrl + '/enum/address_purpose').then(function(res){
                    dataLoaderPropsMethods.setPurpose(res.data.data)
                })
            }
        }
        render() {
            if(dataLoad.vendors){
                this.props.dataLoaderProps.vendors = this.state.vendors;
            }
            return ( <OuterComponent {...this.props} />);
        }
    }
    
    const mapStateToProps = (state) => {
        return {
            dataLoaderProps:{
                auth:state.auth,
                language:state.language,
                locations:state.locations,
                purpose: state.addressPurpose,
                notes: state.notes
            }
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            dataLoaderPropsMethods: {
                setPurpose: (purpose) => { dispatch({type:ActionTypes.SET_ALL_PURPOSE, payload:purpose})},
                setCountry: (countryList) => { dispatch({type:ActionTypes.SET_COUNTRY, payload:countryList})},
                setState: (states) => { dispatch({type:ActionTypes.SET_STATE, payload:states})},
                setCity: (cityList) => { dispatch({type:ActionTypes.SET_CITY, payload:cityList})},
                setNotes: (notes) => { dispatch({type:ActionTypes.SET_NOTES, payload:notes})},
                clearNotes: () => { dispatch({type:ActionTypes.CLEAR_NOTES})}
            }
        }
    }

    return connect (mapStateToProps,mapDispatchToProps) ( RsDataLoaderClass );
}

export default RsDataLoader;