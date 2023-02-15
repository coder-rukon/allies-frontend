import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <button {...this.props} className={ 'btn rs_btn ' + ( this.props.className ? this.props.className : '' )} >{this.props.title}</button>
        );
    }
}

export default Button;