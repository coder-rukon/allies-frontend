import React, { Component } from 'react';

class Tab extends Component {
    constructor(props){
        super(props);
        this.state = {
            active:this.props.activeTab  ? this.props.activeTab  : null
        }
    }
    onClickHanlder(navItem){
        if(this.props.onClick){
            this.props.onClick(navItem)
        }
        this.setState({
            active:navItem.id
        })
    }
    render() {
        let navs = this.props.navs ? this.props.navs : [];
        return (
            <div className={ this.props.className ? 'tab ' + this.props.className : 'tab' }>
                <div className='tab_nav'>
                    {navs.map((navItem,key) =>{
                        return(
                            <div className={this.state.active == navItem.id ? 'tab_nav_item active': 'tab_nav_item'} key={key} onClick={e => this.onClickHanlder(navItem)}>
                                {navItem.title}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Tab;