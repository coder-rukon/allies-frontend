import React, { Component } from 'react';
import Alert from './Alert';

class DisplayErrors extends Component {
    render() {
        if(Object.keys(this.props.errors).length <=0){
            return <></>
        }
        if(this.props.name){
            if(this.props.errors[this.props.name]){
                return(<Alert  type={'danger'}>{this.props.errors[this.props.name]}</Alert>)
            }else{
                return <></>
            }
        }
        let errors = [];
        for (const objKey in this.props.errors) {
            if (Object.hasOwnProperty.call(this.props.errors, objKey)) {
                errors.push(this.props.errors[objKey][0]);
            }
        }
        return (
            <div className='errors_section'>
                {
                    errors.map( (error,key) => {
                        return(<Alert key= {key} type={'danger'}>{error}</Alert>)
                    })
                }
            </div>
        );
    }
}

export default DisplayErrors;