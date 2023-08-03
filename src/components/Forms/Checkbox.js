import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked : (this.props.isChecked =='yes' || this.props.isChecked == true ) ? true : false
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.isChecked != prevProps.isChecked){
            this.setState({
                isChecked : (this.props.isChecked =='yes' || this.props.isChecked == true ) ? true : false
            })
        }
    }
    onChangeHandler(e){
        let that = this;
        this.setState({
            isChecked : ! this.state.isChecked
        },function(){
            if(that.props.onChange && typeof that.props.onChange ==='function'){
                that.props.onChange(e.target.name, ( that.state.isChecked ? 'on' : 'off' ) )
            }
        })
    }
    render() {
        let id = this.props.id ? this.props.id : Math.floor(Math.random() * 100);
        return (
            <div className="form-group custom-control custom-checkbox rs_input_checkbox">
                <input type="checkbox" checked={this.state.isChecked} onChange={ e => this.onChangeHandler(e) } value={this.props.value} className="custom-control-input" name={this.props.name} id={id}/>
                <label className="custom-control-label" htmlFor={id}>{this.props.label}</label>
            </div>
        );
    }
}

export default Checkbox;