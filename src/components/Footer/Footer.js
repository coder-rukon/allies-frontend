import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <>
                <div className='footer_banner'>
                    <div className='container'>
                        <img src="/images/footer_banner.png"/>
                    </div>
                </div>
                <div className='main_fotoer'>
                    <div className='container'>
                        <div className='d-flex copy_wraper'>
                            <p>&copy; Allies Commercial Realty. All rights reserved.</p>
                            <p>Develop and Maintain by Allies</p>
                        </div>
                    </div>
                </div>
            </>
            
        );
    }
}

export default Footer;