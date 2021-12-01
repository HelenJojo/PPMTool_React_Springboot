import axios from "axios"; //package which will be used to make HTTP requests to API endpoint..the library we're going to use to talk to backend
import { DELETE_PROJECT, GET_ERRORS, GET_PROJECT, GET_PROJECTS } from "./types";

//Action - that which describes the changes in the state of the application
//Reducer - that which actually carries out the state transition depending on the action

//Synchronous actions: as soon as an action is dispatched, the state is immediately updated
//Async actions - wait for/till a task to complete before dispatching action...typical ex: waiting fore response from API call
//history in param is what allows to redirect once we submit the project
export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post("/api/project", project);
    history.push("/dashboard"); //send user back to dashboard
    /*
    The Redux store has a method called dispatch. 
    The only way to update the state is to call store.dispatch() and pass in an action object. 

    You can think of dispatching actions as "triggering an event" in the application. 
    Something happened, and we want the store to know about it. Reducers act like event listeners,
     and when they hear an action they are interested in, they update the state in response.

     State is Read-Only​
    The only way to change the state is to dispatch an action, an object that describes what happened.
    */
    dispatch({
      type: GET_ERRORS,
      //payload is a conventional name
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  const res = await axios.get("/api/project/all");
  dispatch({
    //3...by the way...this is an object...our "action"
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProject = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard"); //just send user back to the dashboard if/when they try to update a project whose identifier does not exist (and point of access being the URL)
  }
};

export const deleteProject = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you would like to delete this project? This will permanently delete the entire project including all the data related to it!"
    )
  ) {
    await axios.delete(`/api/project/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
  }
};
