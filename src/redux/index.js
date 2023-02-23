import {combineReducers, configureStore} from '@reduxjs/toolkit';
import slice from './slice';

const rootReducer = combineReducers({
    redux: slice
});

export const store = configureStore({
    reducer: rootReducer,
});