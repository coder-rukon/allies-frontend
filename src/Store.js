import { createStore, combineReducers } from "redux";
const rootReducer = combineReducers({
    abc:{abc:'ddd'}
});
const Store = createStore(rootReducer);
export default Store;