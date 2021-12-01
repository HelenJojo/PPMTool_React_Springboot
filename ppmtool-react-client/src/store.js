import { createStore, applyMiddleware, compose } from "redux"; //importing functions
import thunk from "redux-thunk"; //package that is a standard way to define async action action creators...its a middleware
import rootReducer from "./reducers";

const initalState = {};
const middleware = [thunk]; //thunk is the middleware we would like to apply...other examples including for logging purposes

let store;

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

if (window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools) {
  store = createStore(
    /*
    A Redux app really only has one reducer function: the "root reducer" function that you will pass
     to createStore later on. That one root reducer function is responsible for handling all of the
      actions that are dispatched, and calculating what the entire new state result should be every time.

      The Redux store brings together the state, actions, and reducers that make up your app. 
    */
    rootReducer,
    initalState,
    compose(
      /*
      Redux uses a special kind of addon called middleware to let us customize the dispatch function.
      Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.
      */
      applyMiddleware(...middleware),
      //Redux-Devtools provide us debugging platform for Redux apps.
      //It allows us to perform time-travel debugging and live editing.
      ReactReduxDevTools
    )
  );
} else {
  // Create a new Redux store with the `createStore` function,
  // and use the `rootReducer` for the business logic
  store = createStore(
    //1
    rootReducer,
    initalState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;

/* Middleware are the main way to customize the store:
Middleware are added using the applyMiddleware enhancer
Middleware are written as three nested functions inside each other
Middleware run each time an action is dispatched
Middleware can have side effects inside
*/
