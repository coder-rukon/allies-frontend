import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
/**
 *  items = [
        {name:'Seller Rep (SR)',id:1},
        {name:'Landlord Rep (LR)',id:2},
        {name:'Buyer Rep (BR)',id:3},
        {name:'Tenant Rep (TR)',id:4},
    ]
 */
class TabNav extends Component {
    render() {
        let url = '/accounts'
        let navItems = this.props.items;
        return (
            <div className='tab_navs_section'>
                <div className='tab_navs_items'>
                    {
                        navItems.map( ( item , key) => {
                            return <NavLink to={url+'/'+item.id} key={key} ><div className='item'><span className='label'>{item.name}</span><span className='icon'>{item.id}</span></div></NavLink>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default TabNav;