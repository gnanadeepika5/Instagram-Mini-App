import { ADD_POST, GET_POST, GET_POSTS, POST_LOADING } from '../action/dispatchTypes';

const initialState = {
  post: {},
  postLikes: [],
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
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    default:
      return state
  }
}