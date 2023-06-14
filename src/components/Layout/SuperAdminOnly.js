import React, { Component } from 'react';
import { connect } from 'react-redux';

class SuperAdminOnly extends Component {
    render() {
        if(this.props.auth.user.role !='super_admin'){
            return <></>
        }
        return (
            <>
                {this.props.children}
            </>
        );
    }
}
const mapStateToProps = (props) =>{
    return {
        auth:props.auth
    }
}
export default connect(mapStateToProps) (SuperAdminOnly);