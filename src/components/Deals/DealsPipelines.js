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
    realodDeals(){
        let that = this;
        this.setState({
            isLoading:true
        },function(){
            that.setState({
                isLoading:false
            })
        })
    }
    isVisible(stage){
        let category = this.props.category;
        if(category===null){
            return true;
        }
        let SellerLandlordRepStage = [1,2,3,4,8,9,10];
        let BuyerTenantRepStage = [1,2,3,5,6,8,9,10];
        if((category == 1 || category == 2) && SellerLandlordRepStage.includes(stage.id)){
            return true;
        }
        if((category == 3 || category == 4) && BuyerTenantRepStage.includes(stage.id)){
            return true;
        }
        return false;
    }
    render() {
        let dealStage = this.props.dealStage.stage;

        return (
            <div className='deals_piplelins'>
                <div className='deals_piplelins_row'>
                    {
                       this.state.isLoading ? <SimpleLoader/> : dealStage.map( (stage,key ) => {
                            
                            return this.isVisible(stage) ? <DealPipleLineItem reloadDealsPage={ this.realodDeals.bind(this)} key={key} stage ={stage} category={this.props.category} /> : ''
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