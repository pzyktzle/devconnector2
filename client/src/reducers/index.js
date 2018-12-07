import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

/* 
  root reducer 
*/
export default combineReducers({
  auth: authReducer, // authReducer reduces authentication data to "auth" property of redux state
  errors: errorReducer // errorReducer reduces error data to "errors" property of redux state
});
