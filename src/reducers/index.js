import { combineReducers } from 'redux';
import authReducer from './authReducer';
import jotterReducer from './jotterReducer';
import errorReducer from './errorReducer';


export default combineReducers({
  auth: authReducer,
  jotter: jotterReducer,
  error: errorReducer
});