import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <button className='btn rs_btn' {...this.props}>{this.props.title}</button>
        );
    }
}

export default Button;