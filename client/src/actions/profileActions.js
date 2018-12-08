import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading()); // dispatch to the reducer
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING // let reducer know profile data is loading
  };
};

// clear profile
export const setClearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
