import React, { Component } from 'react';
import Popup from '../widget/Popup';

class DealPopup extends Component {
    render() {
        return (
            <Popup {...this.props}>
                Deail Deails
            </Popup>
        );
    }
}

export default DealPopup;