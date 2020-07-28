import { CLEAR_ERRORS, GET_ERRORS, SEARCH_POSTS} from './dispatchTypes';
import axios from 'axios';
import store from '../store';
import isEmpty from '../utils/isEmpty';


// Search posts by search text
export const searchPosts = (searchText, history) => dispatch => {
  dispatch(clearErrors());
  axios.get(`/api/search/captionOrText/${searchText}`)
       .then(res =>  {
        const state = store.getState();
        if(!isEmpty(state.errors)){
          // clearErrors
          dispatch(clearErrors());
        }
        
        // add post data to redux store
        dispatch({
          type: SEARCH_POSTS,
          payload: res.data
        })
        // Post successful. Send user to dashboard page
        //history.push('/searchPost');
      })
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err
        }));

}
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
}

