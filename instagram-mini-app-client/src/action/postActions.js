import { ADD_POST, GET_POST, GET_POSTS, POST_LOADING, CLEAR_ERRORS, GET_ERRORS } from './dispatchTypes';
import axios from 'axios';
import store from '../store';
import isEmpty from '../utils/isEmpty';

// Add Post
export const addPost = (postData, history) => dispatch => {
  axios.post('/api/posts', postData)
      .then(res => {
        const state = store.getState();
        if(!isEmpty(state.errors)){
          // clearErrors
          dispatch(clearErrors());
        }
        
        // add post data to redux store
        dispatch({
          type: ADD_POST,
          payload: res.data
        });
        // Post successful. Send user to dashboard page
        history.push('/dashboard');
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
}

// Get all posts
export const getPosts = () => dispatch => {
  //dispatch(postLoading());
  axios.get('/api/posts')
      .then(res => {
        // add posts to redux store
        dispatch({
          type: GET_POSTS,
          payload: res.data
        });

      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
}

// Get a single Post
export const getPost = id => dispatch => {
  //dispatch(clearErrors());
  dispatch(postLoading());
  axios.get(`/api/posts/id/${id}`)
      .then(res => {
          dispatch({
            type: GET_POST,
            payload: res.data
          })
      })
      .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: [null]
          })
      });
}

// Get all posts by a user when user handle is passed
export const getPostsByHandle = handle => dispatch => {
  //dispatch(clearErrors());
  dispatch(postLoading());
  axios.get(`/api/posts/handle/${handle}`)
      .then(res => {
          dispatch({
            type: GET_POSTS,
            payload: res.data
          })
      })
      .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: [null]
          })
      });
}

// Add likes - adds a user to the likes array of a post and get the updated posts list
export const addLike = id => dispatch => {
  axios.post(`/api/posts/like/${id}`)
      .then(res => {
        console.log(res.data);
        dispatch(getPosts());
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
}

// Remove Like
export const removeLike = id => dispatch => {
  axios.post(`api/posts/unlike/${id}`)
      .then(res => dispatch(getPosts()))
      .catch(err => {
        dispatch ({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/posts/comment/${postId}`, commentData)
      .then(res => {
        console.log(res.data);
          dispatch({
            type: GET_POST,
            payload: res.data
          })
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: null
        })
      });
}

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios.delete(`/api/posts/comment/${postId}/${commentId}`)
      .then(res => dispatch({
        type: GET_POST,
        payload: res.data
      }))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
}

// Delete a post
export const deletePost = (postId) => dispatch => {
  axios.delete(`/api/posts/id/${postId}`)
      .then(res => {
        //console.log(res.data);
        dispatch(getPosts());
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
}

export const postLoading = () => {
  return {
    type: POST_LOADING
  };
}

export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
}