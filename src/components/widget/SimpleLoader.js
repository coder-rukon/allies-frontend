import React, { Component } from 'react';

class SimpleLoader extends Component {
    render() {
        return (
            <div className='rs_loader' style={{textAlign:'center'}}>
                <img src="/images/loading.gif" style={{height:'50px'}} alt="Loading.."/>
            </div>
        );
    }
}

export default SimpleLoader;