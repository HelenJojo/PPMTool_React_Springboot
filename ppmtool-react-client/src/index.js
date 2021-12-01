import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
// When creating a React component, the component's name MUST start with an upper case letter.
// Display the App component in the "root" element:

// ReactDOM.render() takes 2 arguments, HTML code and an HTML element
// The purpose of the function ReactDOM.render() is to display the specified HTML code
// (App in this case) inside the specified HTML element (root in this case)
//But where will it be rendered?
// In the index.html of the public folder, you'll notice a <div id="root"></div> ...
// This is where our React application will be rendered
/*
The App component is rendered in a container called root
ex: ReactDOM.render(myElement, document.getElementById('root'));

The root node is the HTML element where you want to display the result.
          It is like a container for content managed by React.
          It does NOT have to be a <div> element and it does NOT have to have the id='root':
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
