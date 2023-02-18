import React, { Component } from 'react';
import ActivityListItem from './ActivityListItem';

class ActivityList extends Component {
    constructor(props){
        super(props);
        let tempText = 'dafdlf dsaflds fsdlfsdlf fjlsflsfklds flsdfl fldsfldslf';
        this.state = {
            listActivity:[
                {text:tempText},
                {text:tempText},
                {text:tempText},
                {text:tempText},
                {text:tempText},
                {text:tempText},
                {text:tempText},
                {text:tempText},
                {text:tempText},
                {text:tempText},
            ]
        }
    }

    render() {
        
        return (
            <div className='activity_list_panel'>
                {
                    this.state.listActivity.map((activity,key) =>{
                        return <ActivityListItem key={key} activity ={activity}/>
                    })
                }
            </div>
        );
    }
}

export default ActivityList;