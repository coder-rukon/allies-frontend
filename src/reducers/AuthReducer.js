import ActionTypes from "../actions/ActionsTypes";

const defaultState = {
    user:null
}
const AuthReducer = (state = defaultState, actions) =>{
    if(actions.type === ActionTypes.SET_USER){
        state = {
            ...state,
            user:actions.payload
        }
    }
    if(actions.type === ActionTypes.SET_LOGOUT){
        state = {
            ...state,
            user:null
        }
    }
    return state;
}
export default AuthReducer;