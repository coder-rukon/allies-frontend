import React, { Component } from 'react';
import Button from '../../Forms/Button';
import Dropdown from '../../Forms/Dropdown';
import Helper from '../../Helper';
import { connect } from 'react-redux';
import Api from '../../Api';

class HeaderActions extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
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
    render() {
        let dropdownOptions=  this.props.dealStage.stage.map( stateItem => {
            return  {label:stateItem.name,value:stateItem.id}
        })
        let deal = this.props.deal;
        let dealTypeName = this.props.accountType.find(  item => {
            return item.id == deal.deal_type;
        } )
        return (
            <div className='action_header'>
                <div className='action_header_row'>
                    <div className='left_items'>
                        <div>Date<span>{Helper.formateDateFromDb(deal.agreement_starting_date)} To {Helper.formateDateFromDb(deal.agreement_end)}</span></div>
                        <div>Type<span>{dealTypeName.name ? dealTypeName.name : ''}</span></div>
                    </div>
                    <div className='right_items'>
                        <div className='right_item'>
                            <Dropdown className="dropdown_lg" options={dropdownOptions} onChange={this.onStageChange.bind(this)} value={deal.deal_stage}/>
                        </div>
                        <div className='right_item'>
                            <Button title="Delete" type="danger" className="delete_btn" iconClass="delete_icon"/>
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
export default connect(mapStateToProps) (HeaderActions);