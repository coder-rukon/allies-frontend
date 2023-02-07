import InputPlaceholder from "./InputPlaceholder";
import React, { Component } from 'react';
class Input extends Component {
    constructor(props){
        super(props);
        this.state = {
            isError: false,
            value:'',
            fileData:null,
            isRequired: this.props.required ? true : false,
            cssClass: 'form-group '+ ( this.props.className ? this.props.className  : '' )
        }
    }
    onChangeHandler(e){
        
        if( this.state.isRequired && (e.target.value === "" || e.target.value === null)){
            this.setState({
                isError:true
            })
        }else{
            this.setState({
                isError:false
            })
        }
        if(this.props.onChange && typeof this.props.onChange == 'function'){
            if(this.props.inputType ==='file'){
                this.fileChangeHandler(e,this.props.onChange)
            }else{
                this.props.onChange(e,this.state.isError)
            }
        }else{
            this.setState({
                value:e.target.value
            })
        }
    }
    fileChangeHandler(e,calbackFunction){
        if(!e.target.files[0]){
            return;
        }
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            that.setState({
                fileData:reader.result
            })
            calbackFunction(e,{
                fileData:reader.result
            });
            
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    focusOutHandler(e){
        this.onChangeHandler(e)
    }
    getInputBox = () => {
        let props = this.props;
        const {inputType} = props;
        let inputValue = props.value ? props.value : this.state.value;
        let inputProps = {};
        if(this.props.onKeyPress){
            inputProps.onKeyPress = this.props.onKeyPress;
        }
        if(props.disable){
            let value = props.value;
            return <InputPlaceholder label= {value }/>
        }
        
        if(inputType ==='textarea'){
            return (
                <textarea autoComplete="off" onBlur  = { e => this.focusOutHandler(e)} type={inputType ? inputType : 'text'} name={props.name} value={inputValue ? inputValue : ''} onChange={ e => this.onChangeHandler(e) } className={'form-control ' +  (props.inputClassName ? props.inputClassName : '' )}  placeholder={props.placeHolder ? props.placeHolder : props.placeholder}/> 
            )   
        }
        return (
            <>
                <input {...inputProps} autoComplete="off" onBlur  = { e => this.focusOutHandler(e)} type={inputType ? inputType : 'text'} name={props.name} value={inputValue ? inputValue : ''} onChange={ e => this.onChangeHandler(e) } className={'form-control ' +  (props.inputClassName ? props.inputClassName : '' )}  placeholder={props.placeHolder ? props.placeHolder : props.placeholder}/> 
            </>
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
        let cssClass = this.state.cssClass;
        if(props.labelAlign && props.labelAlign ==='left'){
            cssClass = cssClass+' lebel_align_left';
        }
        return (
            <div className={  cssClass + ( this.hasError() ? ' invalid' : '' ) }>
                {props.label ? <label>{props.label} {this.state.isRequired ? <span>*</span> : ''}</label> : '' }
                <div className="rs_input_box_wraper">{ this.getInputBox() }</div>
                { props.helpText ? <small className={ ( props.helpTextClass ? props.helpTextClass : '' ) + " form-text text-muted" }>{props.helpText}</small> : ''}
            </div>
        )
    }
}

export default Input;