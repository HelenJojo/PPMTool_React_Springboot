import { combineReducers } from "redux";
import backlogReducer from "./backlogReducer";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import securityReducer from "./securityReducer";

//root reducer whose only job is to call the other two functions.
/*
*combineReducers accepts an object where the key names will become the keys in your root state object,
 and the values are the slice reducer functions that know how to update those slices of the Redux state.

 using combineReducers is what allows us to create one root reducer
 */
export default combineReducers({
  errors: errorReducer,
  // Define a top-level state field named `project`, handled by `projectReducer`
  project: projectReducer,
  backlog: backlogReducer,
  security: securityReducer,
});
