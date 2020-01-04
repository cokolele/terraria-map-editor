import { combineReducers, createStore } from "redux";

import appReducer from "/state/modules/app.js";
import statusReducer from "/state/modules/status.js";

const rootReducer = combineReducers({
    app: appReducer,
    status: statusReducer
});

const store = createStore(rootReducer);

export default store;