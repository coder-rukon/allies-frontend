import { createStore, combineReducers } from "redux";
import AccountTypeReducer from "./reducers/AccountTypeReducer";
import AuthReducer from "./reducers/AuthReducer";
import DealStageReducer from "./reducers/DealStageReducer";
const rootReducer = combineReducers({
    auth:AuthReducer,
    accountType:AccountTypeReducer,
    dealStage:DealStageReducer,
});
const Store = createStore(rootReducer);
export default Store;