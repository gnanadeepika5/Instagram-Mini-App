import { MESSAGE_LOADING, GET_MESSAGES, ADD_MESSAGE } from '../action/dispatchTypes';

const initialState = {
  // message:{},
  messages: [],
  loading: false
}

export default function(state = initialState, action){
  switch(action.type) {
    case MESSAGE_LOADING:
      return {
        ...state,
        loading: true
      }
      case ADD_MESSAGE:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
        loading: false
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false
      }
    default:
      return state
  }
}