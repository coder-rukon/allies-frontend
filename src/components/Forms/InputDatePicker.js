import React, { Component } from 'react';
import Input from "./Input"
import $ from 'jquery';
import '../../../node_modules/jquery-datetimepicker/build/jquery.datetimepicker.min.css';
import datetimepicker from 'jquery-datetimepicker';
/**
 * dateFormat : default : Y-m-d H:i
 * disable : true/false : false
 * timepicker : false
 * inputClassName : css class name of input
 * selectorName : input box selector name
 * placeholder : Input placeholder
 * onChange : OnChnage method
 */
import store from '../../store/index.js';
import Helper from '../../inc/Helper';


class InputDatePicker extends Component {
    constructor(props){
        super(props);
        this.selectorName = this.props.inputClassName ? this.props.inputClassName : 'rs_datepicker';
    }
    componentDidMount(){
        let that = this;
        let selectorName = this.selectorName;
        $('.' + selectorName).datetimepicker({
            timepicker: that.props.timepicker ? true : false,
            format: Helper.getDatePickerFormate(),//that.props.dateFormat ? that.props.dateFormat :  'd-m-Y',
            mask:true,
            onChangeDateTime:(e,$input) => {
                that.props.onChange(that.props.name,$input.val())
            }
        }); 
    }
    render() {
        let props = this.props;
        let value = Helper.formateDate(this.props.value)
        return(
            <Input {...props} value={value} inputClassName={ this.selectorName  } />
        )
    }
}

export default InputDatePicker;