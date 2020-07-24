import axios from "axios"
import { 
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  SET_CURRENT_USER,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_FOLLOWING,
  GET_FOLLOWERS,
  GET_USER_PROFILE
} from "./dispatchTypes"

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

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

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios
  .get(`/api/profiles/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }) 
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Edit Profile
export const editProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profiles', profileData)
    .then(res => history.push(`/profiles/${res.data.handle}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(clearErrors());
  dispatch(clearCurrentProfile());
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all people you are following when a user handle is given
export const getFollowing = handle => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios
    .get(`/api/profiles/following/handle/${handle}`)
    .then(res => 
      dispatch({
        type: GET_FOLLOWING,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
}

// Get all the followers of a user when userHandle is given
export const getFollowers = handle => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios
    .get(`api/profiles/followers/handle/${handle}`)
    .then(res => 
      dispatch({
        type: GET_FOLLOWERS,
        payload: res.data
      }))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      )
}

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/users/')
      .then(res =>{

        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
}

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Follow user provided user handle
export const followUserByHandle = (handle, avatar) => dispatch => { 
  axios
  .post(`/api/profiles/follow/handle/${handle}/${avatar}`)
    .then(res =>
      dispatch({
        type: FOLLOW_USER,
        payload: res.data,
      }) 
    )  
};

// Unfollow user provided user handle
export const unFollowUserByHandle = handle => dispatch => { 
  axios
  .post(`/api/profiles/unfollow/handle/${handle}`)
    .then(res =>
      dispatch({
        type: UNFOLLOW_USER,
        payload: res.data,
      }) 
    )  
};