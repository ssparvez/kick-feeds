import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import jotterReducer from './jotterReducer';
import errorReducer from './errorReducer';


export default combineReducers({
  auth: authReducer,
  form: formReducer,
  jotter: jotterReducer,
  error: errorReducer
});