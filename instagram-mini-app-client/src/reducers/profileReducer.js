import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    FOLLOW_USER,
    UNFOLLOW_USER,
    CLEAR_CURRENT_PROFILES,
    GET_FOLLOWING,
    GET_FOLLOWERS
} from "../action/dispatchTypes";

const initialState = {
    profile: null,
    following: null,
    followers: null,
    profiles: null,
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                    loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                    loading: false
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };
        case FOLLOW_USER:
            return {
                ...state,
                loading: false
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                loading: false
            };
        case GET_FOLLOWING:
            return {
                ...state,
                following: action.payload
            };
        case GET_FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            };
        case CLEAR_CURRENT_PROFILES:
            return {
                ...state,
                profiles: null
            }
            default:
                return state;
    }
}
