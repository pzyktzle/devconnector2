import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

/*
  redux reducer. a reducer is a function that accepts an accumulation and a value, and returns a new accumulation.
  reducers are used to reduce a collection of values down to a single value.
*/
export default function(state = initialState, action) {
  switch (action.type) {
    // case TEST_DISPATCH:
    //   return {
    //     ...state,
    //     user: action.payload
    //   }; // returns all previous states and manipulates the last state to have new user object

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
