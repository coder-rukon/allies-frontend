import React, { Component } from 'react';

class Alert extends Component {
    render() {
        return (
            <div class={this.props.type ? 'alert alert-'+this.props.type : 'alert alert-primary'} role="alert">
                {this.props.children}
            </div>
        );
    }
}

export default Alert;