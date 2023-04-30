import React, { Component } from 'react';

class SeconderyHeader extends Component {
    render() {
        return (
            <div className='secondery_header_wraper'>
                <div className='container'>
                    <div className='secondery_header'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default SeconderyHeader;