import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';
import messageReducer from './messageReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  auth: authReducer, 
  errors: errorReducer,
  post: postReducer,
  profile: profileReducer,
  message: messageReducer,
  search: searchReducer
})