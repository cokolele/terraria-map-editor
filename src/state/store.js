import { createStore } from "redux";

import appReducer from "src/state/state.js";

const store = createStore(appReducer);

export default store;