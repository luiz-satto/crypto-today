import { cryptoApi } from '../../services/crypto-api'
import { cryptoNewsApi } from "../../services/crypto-news-api";

import ThemeReducer from "./ThemeReducer";
import { applyMiddleware, createStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    ThemeReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, cryptoApi.middleware)
)

export default store;