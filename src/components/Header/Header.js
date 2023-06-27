import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyAccountWidget from './MyAccountWidget';
import { connect } from 'react-redux';
import ActionTypes from '../../actions/ActionsTypes';
import Api from '../Api';
import SuperAdminMenu from './SuperAdminMenu';
import SuperUserHeader from './SuperUserHeader';

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
                    <div className='container'>
                        <div className='header_main_row'>
                            <div className='left_section'>
                                <Link to="/" className='logo'><img src="/images/logo.png" alt="logo"/></Link>
                            </div>
                            <div className='right_section'>
                                <ul className='main_nav'>
                                    <li><Link to="/accounts/all"> <span className='label'>Company</span></Link></li>
                                    <li><Link to="/property/all"> <span className='label'>Property</span></Link></li>
                                    <li><Link to="/deals-pipeline/all"> <span className='label'>Deal Pipeline</span></Link></li>
                                    <li><Link to="/deal-archive"> <span className='label'>Archive Deal's</span></Link></li>
                                    <SuperAdminMenu/>
                                    <li><Link to="/deal/new"> <span className='btn rs_btn'>New Deal</span></Link></li>
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