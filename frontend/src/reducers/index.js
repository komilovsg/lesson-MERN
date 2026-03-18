import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

const rootReducer = combineReducers({
  alerts: alert,
  auth
  // profile, post ... later
});

export default rootReducer;

