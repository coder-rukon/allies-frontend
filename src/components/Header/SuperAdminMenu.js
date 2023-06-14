import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SuperAdminMenu extends Component {
    render() {
        if(this.props.auth.user.role !='super_admin'){
            return <></>
        }
        return (
            <li><Link to="/users"> <span>All users</span></Link></li>
        );
    }
}
const mapStateToProps = (props) =>{
    return {
        auth:props.auth
    }
}
export default connect(mapStateToProps) (SuperAdminMenu);