import React, { Component } from 'react';
import InputPlaceholder from './InputPlaceholder';
import '../../assets/js/chosen/chosen.jquery.js';
import '../../assets/js/chosen/chosen.min.css';
import $ from 'jquery';
import Helper from '../../inc/Helper';
import { connect } from 'react-redux';

class Dropddown extends Component {
    constructor(props){
        super(props);
        this.trigerTime = 0;
        this.id =  this.props.id ? this.props.id : new Date().getTime();
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
    componentWillUnmount(){
        let inputSelector = $('#'+this.id);
        inputSelector.chosen('destroy');
    }
    initChoosen(){
        let language = this.props.language;
        let that = this;
        let inputSelector = $('#'+this.id);
        try {
            if(inputSelector){
                inputSelector.chosen({
                    disable_search_threshold:0,
                    placeholder_text_single:this.props.placeHolder ? this.props.placeHolder : Helper.getLabel(language,'please_select','Please Select'),
                    placeholder_text_multiple :this.props.placeHolder ? this.props.placeHolder : Helper.getLabel(language,'please_select','Please Select'),
                    rtl:Helper.isRtl()
                }).change(function(event){
                    if(event.timeStamp !==that.trigerTime){
                        if(that.props.onChange && typeof that.props.onChange === 'function'){
                            that.trigerTime =event.timeStamp;
                            that.props.onChange(event)
                        }
                    }
                });
            } 
        }
        catch(err) {
            console.log('DropdownComponent',err);
        }
    }
    componentDidUpdate(prevProps) { 
        let inputSelector = $('#'+this.id );
        if(inputSelector){
            inputSelector.trigger('chosen:updated');
        }
    }
    getInputBox = () => {
        let language = this.props.language;
        let props = this.props;
        if(props.disable){
            return <InputPlaceholder label= {props.value}/>
        }
        let that = {
            props:props
        }
        return (
            <select defaultValue={that.props.value ? that.props.value : ''} id ={this.id} name={props.name} className="form-control rs_chosen_dropdown" onChange={ props.onChange ? e => props.onChange(e) : e => { } }>
                <option></option>
                {
                    props.options.map( (item,key) => {
                        if(that.props.value === item.value){
                            return(<option key={key} value={item.value} >{item.label}</option>)
                        }
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
    render() {
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
}
const mapStateToProps = (state) => {
    return {
        language:state.language
    }
}

export default  connect (mapStateToProps)  ( Dropddown );