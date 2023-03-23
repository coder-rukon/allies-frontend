import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Button extends Component {
    disableButton(){
        return(
            <button className={ 'btn rs_btn ' + ( this.props.className ? this.props.className : '' )} style={{opacity:'.5'}} >
                {this.props.iconClass ? <span className={'btn_icon ' + this.props.iconClass}></span> : ''}
                {this.props.title}
            </button>
        )
        
    }
    getLinkButton(){
        return (
            <Link {...this.props} className={ 'btn rs_btn ' + ( this.props.className ? this.props.className : '' )} >
                {this.props.iconClass ? <span className={'btn_icon ' + this.props.iconClass}></span> : ''}
                {this.props.title}
            </Link>
        );
    }
    render() {
        if(this.props.disable){
            return this.disableButton();
        }
        if(this.props.to){
            return this.getLinkButton();
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