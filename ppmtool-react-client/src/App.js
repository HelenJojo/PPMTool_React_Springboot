import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//Create React App doesn't include page routing.
//React Router is the most popular solution.
// To add React Router in your application, run this in the terminal from the root directory of the application:
// npm i -D react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux"; //allows us to hook up react with redux
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";

import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";

import { logout } from "./actions/securityActions";

import SecuredRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;

//if (local storage has token), keep it there as long as its valid
if (jwtToken) {
  setJWTToken(jwtToken); //set it again bcuz whenever we refresh the page the token is going away
  //App.js is the meeting place for all components...every time we load anything from App.js all we're
  //doing is get the jwt from localstorage, check if that token is there, and set it, set it yet again in the header

  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  //if token has expired, automatically logout logic
  if (decoded_jwtToken.exp < currentTime) {
    //handle logout
    store.dispatch(logout());
    window.location.href = "/";
  }
}

//A class component must include the extends React.Component statement.
// This statement creates an inheritance to React.Component, and gives your component access to React.Component's functions.
// The class component also requires a render() method

class App extends Component {
  render() {
    return (
      /*
      We have to specifically tell React-Redux what store we want to use in our components.
 We do this by rendering a <Provider> component around our entire <App>, and passing the Redux store
  as a prop to <Provider>. After we do this once,
   every component in the application will be able to access the Redux store if needs to.
      */
      <Provider store={store}>
        <Router>
          {
            //enables us to have specific routes...wrap everything of our app in this tag
          }
          <div className="App">
            <Header />
            {
              //Public Routes
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {
              //the component that we wanna bring up when we route to this path
            }

            {
              //Private Routes
            }
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/addProject" component={AddProject} />
              <SecuredRoute
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />
              <SecuredRoute
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
              <SecuredRoute
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />
              <SecuredRoute
                exact
                path="/updateProjectTask/:backlogId/:ptId"
                component={UpdateProjectTask}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
