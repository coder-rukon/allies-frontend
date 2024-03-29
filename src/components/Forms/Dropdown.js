import React, { Component } from 'react';
import InputPlaceholder from './InputPlaceholder';
import $ from 'jquery';
import { connect } from 'react-redux';
import Helper from '../Helper';
import { Select2 } from 'select2';
import 'select2/dist/css/select2.min.css';
class Dropdown extends Component {
    constructor(props){
        super(props);
        this.trigerTime = 0;
        this.id =  this.props.id ? this.props.id : this.props.name;
        this.state ={
            isRequired: this.props.required ? true : false,
            isError:false
        }
    }
    componentDidMount(){
        let that = this;
        setTimeout(function(){
            that.initChoosen();
        },100)
    }
    componentDidUpdate(prevProps){
        if(this.props.disable){
            $('#'+this.id).select2({disabled:true});
        }else{
            $('#'+this.id).select2({disabled:false,placeholder:'Please select'});
        }
    }
    componentWillUnmount(){
        let inputSelector = $('#'+this.id);
    }
    initChoosen(){
        let language = this.props.language;
        let that = this;
        let inputSelector = $('#'+this.id);
        inputSelector.off("change");
        inputSelector.select2();
        inputSelector.on("change", function (e) { 
            that.props.onChange(e)
         });
    }
  
    getInputBox = () => {
        let language = this.props.language;
        let props = this.props;
        
        let that = {
            props:props
        }
        return (
            <select  value={that.props.value ? that.props.value : ''} id ={this.id} name={props.name} className="form-control rs_chosen_dropdown" onChange={ props.onChange ? e => { } : e => { } }>
                <option value={""}></option>
                {
                    props.options.map( (item,key) => {
                        
                        return(<option key={key} value={item.value} >{item.label}</option>)
                    })
                }
            </select>
        )
    }
    hasError(){
        if(this.state.isError){
            return true;
        }
        if(this.props.hasError){
            return true;
        }
        return false;
    }
    getRender(){
        let props = this.props;
        let cssClass = props.className ? 'form-group '+ props.className : 'form-group';
        if(props.labelAlign && props.labelAlign ==='left'){
            cssClass = cssClass+' lebel_align_left';
        }
        
        return(
            <div className={  cssClass + ( this.hasError() ? ' invalid' : '' ) }>
                {props.label ? <label>{props.label} {this.state.isRequired ? <span>*</span> : ''}</label> : '' }
                { this.getInputBox() }
            </div>
        )
    }
    render() {
        if(this.props.wraperClass){
            return <div className={this.props.wraperClass}>{this.getRender()}</div>
        }
        return this.getRender()
    }
}


export default Dropdown;