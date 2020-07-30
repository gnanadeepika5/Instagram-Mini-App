import { POST_LOADING, SEARCH_POSTS} from '../action/dispatchTypes';
const initialState = {
  // message:{},
  posts: [],
  loading: false
}

export default function(state = initialState, action){
  switch(action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
      case SEARCH_POSTS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    default:
      return state
  }
}
