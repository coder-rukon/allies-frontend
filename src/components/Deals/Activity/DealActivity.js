import React, { Component } from 'react';
import ActivityCreator from './ActivityCreator';
import ActivityList from './ActivityList';

class DealActivity extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewListActivity:true
        }
    }
    reloadActivity(){
        this.setState({
            viewListActivity:false
        })
        let that = this;
        setTimeout(function(){
            that.setState({
                viewListActivity:true
            })
        },50)
    }
    render() {
        return (
            <div className='deal_activity_section'>
                <ActivityCreator integrator={this.props.integrator} type={this.props.type} reloadActivity = {this.reloadActivity.bind(this) }/>
                {this.state.viewListActivity ? <ActivityList  reloadActivity = {this.reloadActivity.bind(this) }  integrator={this.props.integrator} type={this.props.type}/> : '' }
            </div>
        );
    }
}

export default DealActivity;