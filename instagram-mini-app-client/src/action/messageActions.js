import { GET_ERRORS, CLEAR_ERRORS , GET_MESSAGES, ADD_MESSAGE} from './dispatchTypes';
import axios from 'axios';
import store from '../store';
import isEmpty from '../utils/isEmpty';

//get all messages
export const getMessages = toUserId => dispatch => {
  //dispatch(messageLoading());
  axios.get(`/api/communications/conversation/${toUserId}`).then(res => 
        // add messages to redux store
        dispatch({
          type: GET_MESSAGES,
          payload: res.data
        }))
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }));
};


// Add message
export const addMessage = (toUserId, messageData) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/communications/conversation/${toUserId}`, messageData)
      .then(res => {
        console.log(res.data);
          dispatch({
            type: ADD_MESSAGE,
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


// // Delete Message
// export const deleteMessage = (toUserId, messageId) => dispatch => {
//   axios.delete(`api/communications/${toUserId}/${messageId}`)
//       .then(res => dispatch({
//         type: GET_MESSAGE,
//         payload: res.data
//       }))
//       .catch(err => {
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       })
// }

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
}