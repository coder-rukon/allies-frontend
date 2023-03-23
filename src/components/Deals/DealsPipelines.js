import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionTypes from '../../actions/ActionsTypes';
import Api from '../Api';
import SimpleLoader from '../widget/SimpleLoader';
import DealPipleLineItem from './DealPipleLineItem';

class DealsPipelines extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false
        }
    }
    componentDidMount(){
        this.loadAccountStage()
    }
    loadAccountStage(){
        this.setState({
            isLoading:true
        })
        let that = this;
        let api = Api;
        api.setUserToken();
        api.axios().get('/deal-stage').then(res => {
            that.setState({
                isLoading:false
            })
            that.props.setStage(res.data.data)
        })
    }
    render() {
        let dealStage = this.props.dealStage.stage;

        return (
            <div className='deals_piplelins'>
                <div className='deals_piplelins_row'>
                    {
                       this.state.isLoading ? <SimpleLoader/> : dealStage.map( (stage,key ) => {
                            return <DealPipleLineItem stage ={stage} category={1} />
                        })
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        dealStage:state.dealStage
    }
}
const mapDispatchTopProps = (dispatch ) => {
    return {
        setStage: (stage) => {
            dispatch({
            type:ActionTypes.SET_DEAL_STAGE,
            payload:stage
        })}
    }
}
export default connect(mapStateToProps,mapDispatchTopProps) ( DealsPipelines );