import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../widget/Icon';

class SuperAdminMenu extends Component {
    render() {
        if(this.props.auth.user.role !='super_admin'){
            return <></>
        }
        return (
            <>
                <li><Link to="/users"><Icon className='uil-users-alt'/> <span>All users</span></Link></li>
                <li><Link to="/super-admin/settings/property-form"><Icon className='uil-cog'/> <span>Settings</span></Link></li>
                <li className='divider'></li>
            </>
        );
    }
}
const mapStateToProps = (props) =>{
    return {
        auth:props.auth
    }
}
export default connect(mapStateToProps) (SuperAdminMenu);