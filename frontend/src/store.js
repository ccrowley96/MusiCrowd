import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger"; //logs actions very nicely
import thunk from "redux-thunk";

// IMPORT COMBINED REDUCER
import reducers from "./reducers";

// STEP 1 CREATE STORE
let middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
	middleware = [...middleware, logger];
}

middleware = applyMiddleware(...middleware);

// PASS INITIAL STATE FROM SERVER STORE
// let initialState = {};
// if (typeof window !== "undefined") {
//     initialState = window.INITIAL_STATE;
// }

const store = createStore(reducers, middleware);

export default store;
