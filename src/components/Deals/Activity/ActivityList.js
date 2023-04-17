import React, { Component } from 'react';
import ActivityListItem from './ActivityListItem';
import Api from '../../Api';
import SimpleLoader from '../../widget/SimpleLoader';

class ActivityList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            listActivity:[
            ]
        }
    }
    componentDidMount(){
        this.loadActivity();
    }
    loadActivity(){
        let that = this;
        let api = Api;
        api.setUserToken();
        that.setState({
            isLoading:true
        })
        api.axios().get('/activity/all/'+this.props.type+'/'+this.props.integrator).then(res => {
            that.setState({
                isLoading:false,
                listActivity:res.data.data
            })
        })
    }

    render() {
        if(this.state.isLoading){
            return <SimpleLoader/>
        }
        return (
            <div className='activity_list_panel'>
                {
                    this.state.listActivity.map((activity,key) =>{
                        return <ActivityListItem  reloadActivity = {this.props.reloadActivity } key={key} activity ={activity}/>
                    })
                }
            </div>
        );
    }
}

export default ActivityList;