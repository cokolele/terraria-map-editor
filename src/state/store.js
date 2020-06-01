import { createStore } from "redux";

import appReducer from "/state/state.js";

const store = createStore(appReducer);

export default store;