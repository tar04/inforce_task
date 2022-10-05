import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {productReducer} from "./slices";

const reducers = combineReducers({
    productReducer,
});

const store = configureStore({
    reducer: reducers
});

export default store;