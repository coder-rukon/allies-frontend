import React, { Component } from 'react';
import Api from '../Api';
import DisplayErrors from '../widget/DisplayErrors';
import Input from '../Forms/Input';
import Settings from '../Settings';
import Helper from '../Helper';
import Button from '../Forms/Button';
import SimpleLoader from '../widget/SimpleLoader';
import Checkbox from '../Forms/Checkbox';
import AlliesGrid from '../Grid/AlliesGrid';

class PropertyDropdownSettings extends Component {
    constructor(props) {
        super(props);
        this.smGrid = null;
        this.cdGrid = null;
        this.rtdGrid = null;
        this.auGrid = null;
        this.state = {
            isLoading:false,
            property_types:[],
            errors:{},
            selectedPropertyTypeId:null,
            selectedPropertyType:{}
        }
    }
    componentDidMount(){
        this.loadPropertyTypes();
    }
    loadPropertyTypes(){
        let api = Api;
        let that = this;
        that.setState({
            isLoading:true
        })
        api.setUserToken();
        api.axios().get(Settings.apiUrl+'/property/property-types').then(res=>{
            that.setState({
                isLoading:false,
                property_types:res.data.data
            })
            let tempData = [{name:'Exmaple name'}];
            that.smGrid.api.setRowData(tempData);
            that.cdGrid.api.setRowData(tempData);
            that.rtdGrid.api.setRowData(tempData);
            that.auGrid.api.setRowData(tempData);
        })
    }
    loadPropertyTypeById(){
        let api = Api;
        let that = this;
        that.setState({
            isLoading:true
        })
        api.setUserToken();
        api.axios().get(Settings.apiUrl+'/property/get-type/'+this.state.selectedPropertyTypeId).then(res=>{
            that.setState({
                isLoading:false,
                selectedPropertyType:res.data.data
            }) 
        })
    }
    onChangeHanlder(event){
        let that = this;
        this.setState({
            selectedPropertyTypeId:event.target.value
        }, () => {
            that.loadPropertyTypeById()
        })

    }
   
    
    saveHandler(e){
        let formData = new FormData(document.getElementById('property_field_frm'));
        formData.append('rs','2222');
        let api = Api;
        let that = this;
        that.setState({
            isLoading:true
        })
        api.setUserToken();
        //let data = Object.fromEntries(formData);
        let for_sale = formData.getAll('for_sale[]')
        let for_lease = formData.getAll('for_lease[]')
        let data = {
            for_sale:for_sale.toString(),
            for_lease:for_lease.toString(),
        }
        api.axios().put(Settings.apiUrl+'/property/property-type-fields/'+this.state.selectedPropertyTypeId,data).then(res=>{
            Helper.alert(res.data.message);
            that.loadPropertyTypeById();
            that.setState({
                isLoading:false
            })
        })
    }
    addNewDataToGrid(grid){
        let data = [];
        grid.api.forEachNode( item => {
            data.push(item.data);
        })
        data.push({name:''});
        grid.api.setRowData(data)
    }
    actionsButtons(grid){
        return(
            <div className='d-flex gap-4'>
                <div>
                    <Button title="Add new" onClick = { () => this.addNewDataToGrid(grid) } />
                </div>
                <div>
                    <Button title="Delete" />
                </div>
            </div>
        )
    }
    render() {
        let propertyTypes = this.state.property_types;
        let headerTitles  = [
            { field: "name", headerName:'Name', editable:true},
        ]
        return (
            <div className='property_page_settings'>

                <div className='container'>
                    <DisplayErrors errors={this.state.errors}/>
                    {  this.state.isLoading ? <SimpleLoader /> : '' }
                    <h5>Property Type</h5>
                    <div className='d-flex gap-4'>
                        {
                            propertyTypes.map( pType => {
                                return <div><Input id={'pro_type_'+pType.property_type_id}  onChange={ this.onChangeHanlder.bind(this)} name="property_type" inputClassName={"radio_input"} inputType="radio" value={pType.property_type_id} label={pType.name}/></div>
                            })  
                        }
                    </div>
                    <h5>Submarket Dropdown</h5>
                    <AlliesGrid  header={headerTitles} actions_buttons = {this.actionsButtons.bind(this,this.smGrid)} id="SubmarketDropdown" onGridReady={ (grid) => { this.smGrid = grid } } height="300px"/>
                    <h5>Class Dropdown</h5>
                    <AlliesGrid  header={headerTitles} actions_buttons = {this.actionsButtons.bind(this,this.cdGrid)} id="ClassDropdown" onGridReady={ (grid) => { this.cdGrid = grid } }  height="300px"/>
                    <h5>Retail Type Dropdown</h5>
                    <AlliesGrid  header={headerTitles} actions_buttons = {this.actionsButtons.bind(this,this.rtdGrid)} id="RetailTypeDropdown" onGridReady={ (grid) => { this.rtdGrid = grid } }  height="300px"/>
                    <h5>Available Utilities</h5>
                    <AlliesGrid  header={headerTitles} actions_buttons = {this.actionsButtons.bind(this,this.auGrid)} id="AvailableUtilities" onGridReady={ (grid) => { this.auGrid = grid } }  height="300px"/>
                    <Button title="Save all" onClick = {this.saveHandler.bind(this)}/>
                </div>
                
            </div>
        );
    }
}

export default PropertyDropdownSettings;