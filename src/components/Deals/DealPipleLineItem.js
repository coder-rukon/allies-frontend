import React, { Component } from 'react';
import DealPipelineItemWidget from './DealPipelineItemWidget';
import Api from '../Api';
import Settings from '../Settings';
import SimpleLoader from '../widget/SimpleLoader';

class DealPipleLineItem extends Component {
    constructor(props){
        super(props);
        this.isCalledApi = false;
        this.state = {
            isLoading:false,
            category:null,
            stage:{},
            deals:[]
        }
    }
    componentDidMount(){
        let that = this;
        this.setState({
            category:this.props.category,
            stage:this.props.stage,
        },()=>{
            that.loadDeals()
        })
    }
    loadDeals(){
        if(this.isCalledApi){
            return;
        }
        this.isCalledApi = true;
        let that = this;
        that.setState({
            deals:[],
            isLoading:true
        })
        let api = Api;
        api.setUserToken();
        let data = {deal_type:this.state.category,deal_stage:this.state.stage.id}
        api.axios().post(Settings.apiUrl+'/deal/all',data).then(res => {
            that.setState({
                deals:res.data.data,
                isLoading:false
            })
        })
    }
    componentDidUpdate(prevState){
        if(prevState.category != this.props.category){
            let that = this;
            this.setState({
                category:this.props.category,
            },()=>{
                that.isCalledApi = false;
                that.loadDeals()
            })
        }
    }
    render() {
        let stage = this.state.stage;
        let styles = {}
        if(stage.bgColor){
            styles.backgroundColor = stage.color;
        }
        
        return (
            <div className='deals_piplelins_item'>
                <div className='deals_piplelins_item_inner' style={styles}>
                    <h3 className='deals_piplelins_item_title'>
                        {stage.name}
                    </h3>
                    <div className='deals_piplelins_contents'>
                        { this.state.isLoading ? <SimpleLoader/> : '' }
                        {
                            this.state.deals.map( (deal,key) => {
                                return <DealPipelineItemWidget deal={deal.deal} property= {deal.property}/>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default DealPipleLineItem;