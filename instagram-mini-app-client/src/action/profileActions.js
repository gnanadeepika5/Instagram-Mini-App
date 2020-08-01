import axios from "axios";
import {
  GET_ERRORS,
  GET_USER_PROFILE,
  CLEAR_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_FOLLOWING,
  GET_FOLLOWERS,
  SET_CURRENT_USER
} from "./dispatchTypes";

// Get userProfileByHandle
export const getUserProfileByHandle = userHandle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${userHandle}`)
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
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios.get('/api/profile').then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_PROFILE,
    payload: {}
  }));
};

// Get Profile by Handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`).then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: null
  }));
};

// Edit Profile
export const editProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData).then(res => history.push(`/profile/${res.data.handle}`)).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};

// Get All Profiles
export const getProfiles = () => dispatch => {
  dispatch(clearErrors());
  dispatch(cleearCurrentProfile());
  dispatch(setProfileLoading());
  axios.get('/api/profile/all').then(res => dispatch({
    type: GET_PROFILES,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};

// Get all People you are following when a user handle is given
export const getFollowing = handle => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios.get(`/api/profile/following/handle/${handle}`).then(res => dispatch({
    type: GET_FOLLOWING,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};

// Get all the followers when a userHandle is given
export const getFollowers = handle => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios.get(`/api/profile/followers/handle/${handle}`).then(res => dispatch({
    type: GET_FOLLOWERS,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};

// Delete account & Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be UNDONE!!')) {
    axios
      .delete('/api/profile')
      .then(res => dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
  }
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const cleearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Follow user by userHandle
export const followUserByHandle = (handle, avatar) => dispatch => {
  const body = {
    avatarUrl: avatar
  };
  axios.post(`/api/profile/follow/handle/${handle}`, body).then(res => dispatch({
    type: FOLLOW_USER,
    payload: res.data
  }))
};

// Unfollow User by userHandle
export const unFollowUserByHandle = handle => dispatch => {
  axios.post(`/api/profile/unfollow/handle/${handle}`).then(res => dispatch({
    type: UNFOLLOW_USER,
    payload: res.data
  }))
};

// Create a Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};
