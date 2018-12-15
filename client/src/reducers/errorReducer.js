import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

// state.errors
const initialState = {};

/*
  redux reducer. a reducer is a function that accepts an accumulation and a value, and returns a new accumulation.
  reducers are used to reduce a collection of values down to a single value.
*/
export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {};
    case GET_ERRORS:
      return action.payload; // set state.errors
    default:
      return state;
  }
}
