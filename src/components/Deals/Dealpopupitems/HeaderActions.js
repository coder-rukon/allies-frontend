import React, { Component } from 'react';
import Button from '../../Forms/Button';
import Dropdown from '../../Forms/Dropdown';
import Helper from '../../Helper';
import { connect } from 'react-redux';
import Api from '../../Api';
import SimpleLoader from '../../widget/SimpleLoader';
import ActionTypes from '../../../actions/ActionsTypes';

class HeaderActions extends Component {
    constructor(props){
        super(props);
        this.state = {
            isStateChanging:false,
            isStatusChanging:false,
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
    onStageChange(event){
        let deal = this.props.deal;
        let api = Api;
        api.setUserToken();
        api.axios().post('/deal/update-stage',{
            deal:deal.id,
            stage: event.target.value 
        }).then(res => {
            Helper.alert(res.data.message)
        })
    }
    changeDealStatus(event){
        let deal = this.props.deal;
        let api = Api;
        api.setUserToken();
        let that = this;
        this.setState({
            isStatusChanging:true
        })
        api.axios().post('/deal/update-status',{
            deal:deal.id,
            status: deal.deal_status ==='active' ?  'archive' : 'active'
        }).then(res => {
            Helper.alert(res.data.message)
            that.setState({
                isStatusChanging:false
            })
            if(that.props.onChngeAction){
                that.props.onChngeAction()
            }
        })
    }
    render() {
        let dropdownOptions=  this.props.dealStage.stage.map( stateItem => {
            return  {label:stateItem.name,value:stateItem.id}
        })
        let deal = this.props.deal;
        let dealTypeName = this.props.accountType.find(  item => {
            return item.id == deal.deal_type;
        } )
        if(this.state.isLoading) {

            return <SimpleLoader/>
        }
        return (
            <div className='action_header'>
                <div className='action_header_row'>
                    <div className='left_items'>
                        <div>Date<span>{Helper.formateDateFromDb(deal.agreement_starting_date)} To {Helper.formateDateFromDb(deal.agreement_end)}</span></div>
                        <div>Type<span>{dealTypeName.name ? dealTypeName.name : ''}</span></div>
                    </div>
                    <div className='right_items'>
                        <div className='right_item'>
                            <Dropdown className="dropdown_lg" id="deal_stage_chaneg" options={dropdownOptions} onChange={this.onStageChange.bind(this)} value={deal.deal_stage}/>
                        </div>
                        <div className='right_item'>
                            {this.state.isStatusChanging ? <SimpleLoader /> : <Button title={ deal.deal_status ==='archive' ? 'Active' : 'Archive' } type="danger" onClick={ this.changeDealStatus.bind(this) } className="delete_btn" iconClass="delete_icon"/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        dealStage:state.dealStage,
        accountType : state.accountType.accountTypes
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
export default connect(mapStateToProps,mapDispatchTopProps) (HeaderActions);