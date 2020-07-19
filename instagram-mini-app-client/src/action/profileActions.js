import axios from "axios";
import { GET_ERRORS, GET_USER_PROFILE } from "./dispatchTypes";

// Get userProfileByHandle
export const getUserProfileByHandle = userHandle => dispatch => {
  axios
    .get(`/api/profiles/handle/${userHandle}`)
    .then(res => 
        dispatch({
          type: GET_USER_PROFILE,
          payload: res.data
        }))
    .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: null
        }))
}