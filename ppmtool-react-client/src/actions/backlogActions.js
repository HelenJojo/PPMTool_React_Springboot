import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
} from "./types";

export const addProjectTask =
  (backlogId, project_task, history) => async (dispatch) => {
    try {
      await axios.post(`/api/backlog/${backlogId}`, project_task);
      history.push(`/projectBoard/${backlogId}`);
      //what we are saying is that everything went well...
      //so whatever errors you might have had there from previous attempt (and therefore previous state)
      //you can get rid of those
      dispatch({
        type: GET_ERRORS,
        //payload is a conventional name
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        //payload is a conventional name
        payload: err.response.data,
      });
    }
  };

export const getBacklog = (backlogId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backlog/${backlogId}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjectTask =
  (backlogId, ptId, history) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/backlog/${backlogId}/${ptId}`);
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data,
      });
    } catch (error) {
      history.push("/dashboard");
    }
  };

export const updateProjectTask =
  (backlogId, ptId, project_task, history) => async (dispatch) => {
    try {
      await axios.patch(`/api/backlog/${backlogId}/${ptId}`, project_task);
      history.push(`/projectBoard/${backlogId}`);

      dispatch({
        type: GET_ERRORS,
        payload: {}, //clearing out payload
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };

export const deleteProjectTask = (backlogId, ptId) => async (dispatch) => {
  if (
    window.confirm(
      `You are deleting Project Task ${ptId}, this action cannot be undone. Are you sure you would like to delete this project task?`
    )
  ) {
    await axios.delete(`/api/backlog/${backlogId}/${ptId}`);
    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: ptId,
    });
  }
};
