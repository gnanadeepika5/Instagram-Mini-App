import { ADD_POST, CLEAR_ERRORS, GET_ERRORS } from './dispatchTypes';
import axios from 'axios';
import store from '../store';
import isEmpty from '../utils/isEmpty';

//Adding a post
export const addPost= (postData, history) => dispatch =>{
  axios.post('/api/posts/', postData)
       .then(res=>{
         const state =store.getState();
         if(!isEmpty(state.errors)){
           //clear errors
           dispatch(clearErrors());
         }

         //adding post data to redux store
         dispatch({
           type:ADD_POST,
           payload:res.data
         });

         //post success.Roiting user to dashboard
         history.push('/dashboard');
       })
       .catch(err=>{
         dispatch({
           type:GET_ERRORS,
           payload: err.response.data
         })
       });
}

//get all posts

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
}