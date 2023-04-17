import React, { Component } from 'react';
import Api from '../../Api';
import Helper from '../../Helper';
import SimpleLoader from '../../widget/SimpleLoader';

class ActivityListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false
        }
    }
    delteHandler(){
        let api = Api;
        api.setUserToken();
        let activity = this.props.activity;
        let that = this;
        this.setState({
            isLoading:true
        })
        api.axios().delete('/activity/delete/'+activity.id).then(res => {
            Helper.alert(res.data.message);
            that.props.reloadActivity();
            that.setState({
                isLoading:false
            })
        })
    }
    render() {
        let activity = this.props.activity;
        if(this.state.isLoading){
            return <div className='activity_list_item'><SimpleLoader/></div> 
        }
        return (
            <div className='activity_list_item'>
                <div className='controller'>...<div><span onClick={e=> this.delteHandler(e) }>Delete</span></div></div>
                <p>{activity.contents}</p>
            </div>
        );
    }
}

export default ActivityListItem;