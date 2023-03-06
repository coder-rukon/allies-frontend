import React, { Component } from 'react';

class Button extends Component {
    disableButton(){
        return(
            <button className={ 'btn rs_btn ' + ( this.props.className ? this.props.className : '' )} style={{opacity:'.5'}} >
                {this.props.iconClass ? <span className={'btn_icon ' + this.props.iconClass}></span> : ''}
                {this.props.title}
            </button>
        )
        
    }
    render() {
        if(this.props.disable){
            return this.disableButton();
        }

        return (
            <button {...this.props} className={ 'btn rs_btn ' + ( this.props.className ? this.props.className : '' )} >
                {this.props.iconClass ? <span className={'btn_icon ' + this.props.iconClass}></span> : ''}
                {this.props.title}
            </button>
        );
    }
}

export default Button;