import { createStore, combineReducers } from "redux";
import AuthReducer from "./reducers/AuthReducer";
const rootReducer = combineReducers({
    auth:AuthReducer
});
const Store = createStore(rootReducer);
export default Store;