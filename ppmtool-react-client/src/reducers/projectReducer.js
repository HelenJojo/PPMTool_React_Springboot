import {
  DELETE_PROJECT,
  GET_ERRORS,
  GET_PROJECT,
  GET_PROJECTS,
} from "../actions/types";

//by the way...note for self: below initialState is an object
//where projects is an array (of project)
//and project is an object
//...
/*
  Let us assume our application’s state is described by a plain object called initialState which is as follows −

const initialState = {
   isLoading: false,
   items: [],
   hasError: false
};
Every piece of code in your application cannot change this state. To change the state, you need to dispatch an action.
*/
//// Define an initial state value describing/for the app
const initialState = {
  projects: [],
  project: {},
};

//A reducer is a central place where state modification takes place.
// Reducer is a function which takes state and action as arguments, and returns a newly updated state.
/*Then, we define a reducer function. The reducer receives two arguments,
 the current state and an action object describing what happened. 
 When the Redux app starts up, we don't have any state yet, so we provide the initialState 
 as the default value for this reducer: */
//// Create a "reducer" function that determines what the new state
// should be when something happens in the app
export default function (state = initialState, action) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    case GET_PROJECTS: //4
      return {
        /*Based on the type of the action, we either need to return a brand-new object
         to be the new state result, or return the existing state object if nothing should change.
          Note that we update the state immutably by copying the existing state and updating the copy, 
          instead of modifying the original object directly. */
        ...state, //The JavaScript spread operator (...) allows us to quickly copy all or part of an existing array or object into another array or object.
        //An action object can have other fields with additional information about what happened.
        //By convention, we put that information in a field called payload.
        projects: action.payload, //updating the projects field in state as defined in initialState above with new value received
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case DELETE_PROJECT:
      return {
        ...state, //COPY previous/current state so that we are not mutating state directly
        //update (list of) "projects" to include all except the one that has just been deleted
        projects: state.projects.filter(
          (project) => project.projectIdentifier !== action.payload
        ),
      };
    // If the reducer doesn't care about this action type,
    // return the existing state unchanged
    default:
      return state;
  }
}

/* A reducer is a function that receives the current state and an action object,
 decides how to update the state if necessary, and returns the new state: (state, action) => newState. 

 Reducers act like event listeners, and when they hear an action they are interested in, they update the state in response.
 Reducers are pure functions that take the previous state and an action, and return the next state. 

 The logic inside reducer functions typically follows the same series of steps:

Check to see if the reducer cares about this action ...line 40, 51, 56
If so, make a copy of the state, update the copy with new values, and return it...line 46/53/58
Otherwise, return the existing state unchanged...line 66
 */
