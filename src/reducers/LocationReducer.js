import ActionTypes from "../actions/ActionsTypes";

const defaultState = {
    country:[],
    city:[],
    state:[],
    isLoaed:false
}
const LocationReducer = (state = defaultState, actions) =>{
    if(actions.type === ActionTypes.SET_COUNTRY){
        state = {
            ...state,
            country:actions.payload
        }
    }
    if(actions.type === ActionTypes.SET_STATE){
        state = {
            ...state,
            state:actions.payload
        }
    }
    if(actions.type === ActionTypes.SET_CITY){
        state = {
            ...state,
            city:actions.payload
        }
    }
    return state;
}
export default LocationReducer;