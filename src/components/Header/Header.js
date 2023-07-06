import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyAccountWidget from './MyAccountWidget';
import { connect } from 'react-redux';
import ActionTypes from '../../actions/ActionsTypes';
import Api from '../Api';
import SuperAdminMenu from './SuperAdminMenu';
import SuperUserHeader from './SuperUserHeader';
import Icon from '../widget/Icon';
import SearchBox from '../widget/SearchBox';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        this.loadAccountTypes()
    }
    loadAccountTypes(){
        if(this.props.accountType.isLoaed){
            return;
        }
        let api = Api, that = this;
        api.axios().get('/account-types').then(res => {
            that.props.setAccountType(res.data.data)
        })
    }
    render() {
        return (
            <>
                <SuperUserHeader/>
                <div className='main_header_section'>
                    <div className='container-fluid'>
                        <div className='header_main_row'>
                            <div className='left_section'>
                                <Link to="/" className='logo'><img src="/images/logo-header.png" alt="logo"/></Link>
                            </div>
                            <div className='right_section'>
                                <div className='s_box_h_wraper'><SearchBox/></div>
                                <div className='divider divider_sbox'></div>
                                <ul className='main_nav'>
                                    <li><Link to="/accounts/all" className='active new_link'><Icon className='uil-users-alt'/> <span className='label'><span className='plus_sin'>+</span> Company</span></Link></li>
                                    <li><Link to="/property/create"  className='active new_link'><Icon className='uil-building'/>  <span className='label'><span className='plus_sin'>+</span> Property</span></Link></li>
                                    <li><Link to="/deal/new"  className='active new_link'><Icon className='uil-file-plus-alt'/><span className='label'><span className='plus_sin'>+</span> Deal</span></Link></li>
                                    <li className='divider'></li>
                                    
                                    <li><Link to="/accounts/all"><Icon className='uil-users-alt'/> <span className='label'>Company</span></Link></li>
                                    <li><Link to="/property/all"><Icon className='uil-building'/>  <span className='label'>Property</span></Link></li>
                                    <li><Link to="/deals-pipeline/all"><Icon className='uil-file-plus-alt'/><span className='label'>Deals</span></Link></li>
                                    <li><Link to="/deal-archive"><Icon className='uil-archive-alt'/>  <span className='label'>Archive</span></Link></li>
                                    <li className='divider'></li>
                                    <SuperAdminMenu/>
                                </ul>
                                <div className='widgets_lists'>
                                    <MyAccountWidget/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        accountType : state.accountType
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        setAccountType: (types) => { dispatch({type:ActionTypes.SET_ACCOUNT_TYPE , payload: types})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Header);