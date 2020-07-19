import {GET_ERRORS} from '../action/dispatchTypes';
import {CLEAR_ERRORS} from '../action/dispatchTypes';
const initialState ={};

export default function(state=initialState, action){
  switch(action.type){
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return state= initialState;
    default: 
      return state;
  }
}