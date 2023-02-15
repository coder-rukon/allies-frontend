import React, { Component } from 'react';

class Popup extends Component {

    popupCloseHandler(e){
        if(this.props.onClose && typeof this.props.onClose =='function'){
            this.props.onClose(e)
        }
    }
    render() {
        let contentsStyle = {}
        if(this.props.width){
            contentsStyle.width = this.props.width;
        }
        return (
            <div className='popup_section'>
                <div className='popup_controller' onClick={ e => this.popupCloseHandler(e)}></div>
                <div className='popup_container' style={contentsStyle}>
                    <div className='popup_close'  onClick={ e => this.popupCloseHandler(e)}>x</div>
                    <div className='popup_contents'>
                        {
                            this.props.children
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;