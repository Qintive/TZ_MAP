import { combineReducers } from '@reduxjs/toolkit';
import routeReducer from './routeReducer';

const rootReducer = combineReducers({
  route: routeReducer,
});

export default rootReducer;
