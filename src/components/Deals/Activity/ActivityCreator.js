import React, { Component } from 'react';
import Button from '../../Forms/Button';
import Input from '../../Forms/Input';
import Api from '../../Api';
import Helper from '../../Helper';
import SimpleLoader from '../../widget/SimpleLoader';

class ActivityCreator extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            activity:{}
        }
    }
    onChangeHandler(e){
        this.setState({
            activity:{
                ...this.state.activity,
                [e.target.name]:e.target.value
            }
        })
    }
    onSaveHander(e){
        let that = this, api = Api; 
        api.setUserToken();
        that.setState({
            isLoading:true
        })
        let data = {
            type:this.props.type,
            integrator: this.props.integrator,
            contents:this.state.activity.name
        }
        api.axios().post('/activity/create',data).then(res=>{
            that.setState({
                activity:{},
                isLoading:false
            })
            that.props.reloadActivity()
            Helper.alert(res.data.message);
        })
    }
    render() {
        if(this.state.isLoading){
            return <SimpleLoader/>
        }
        return (
            <div className='activity_creator'>
                <div className='activity_creator_box'>
                    <Input inputType='textarea' id="activity_input" value={this.state.activity.name} onChange={ e => this.onChangeHandler(e)} name="name" placeholder="Type here.."/>
                    <Button title="Create" onClick={ e => this.onSaveHander(e)}/>
                </div>
            </div>
        );
    }
}

export default ActivityCreator;