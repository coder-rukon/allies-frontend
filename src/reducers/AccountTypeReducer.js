import ActionTypes from "../actions/ActionsTypes";

const defaultState = {
    accountTypes:[],
    isLoaed:false
}
const AccountTypeReducer = (state = defaultState, actions) =>{
    if(actions.type === ActionTypes.SET_ACCOUNT_TYPE){
        state = {
            ...state,
            isLoaed:true,
            accountTypes:actions.payload
        }
    }
    return state;
}
export default AccountTypeReducer;