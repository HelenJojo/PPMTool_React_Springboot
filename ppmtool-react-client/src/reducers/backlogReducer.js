import {
  GET_ERRORS,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  GET_BACKLOG,
} from "../actions/types";

const intialState = {
  project_tasks: [],
  project_task: {},
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        project_tasks: action.payload,
      };
    case GET_PROJECT_TASK:
      return {
        ...state,
        project_task: action.payload,
      };
    case DELETE_PROJECT_TASK:
      return {
        ...state,
        //if everything goes well, and API call is a success
        project_tasks: state.project_tasks.filter(
          (project_task) => project_task.projectSequence !== action.payload
        ),
      };

    default:
      return state;
  }
}
