import ActionTypes from "../actions/ActionsTypes";

const defaultState = {
    stage:[],
    isLoaed:false
}
const DealStageReducer = (state = defaultState, actions) =>{
    if(actions.type === ActionTypes.SET_DEAL_STAGE){
        state = {
            ...state,
            isLoaed:true,
            stage:actions.payload
        }
    }
    return state;
}
export default DealStageReducer;