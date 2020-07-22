import {SET_CURRENT_USER} from '../action/dispatchTypes';
import isEmpty from '../validation/isEmpty';
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state=initialState, action){
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      }
    default:
      return state;
  }
};
