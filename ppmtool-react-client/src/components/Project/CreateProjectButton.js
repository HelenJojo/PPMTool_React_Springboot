import React from "react";
import { Link } from "react-router-dom";

//function component
const CreateProjectButton = () => {
  return (
    <React.Fragment>
      {
        //React.Fragment: container like how div wraps up everything except its hidden/ignored
      }
      {
        //Link is from react-router-dom and is an alternative to <a href=> tag in HTML
      }
      <Link
        to="/addProject"
        className="btn btn-lg btn-info"
        style={{
          backgroundColor: "#dee2e6",
          color: "#5a3d75",
          border: "#5a3d75",
          borderStyle: "solid",
        }}
      >
        Create Project
      </Link>
    </React.Fragment>
  );
};
export default CreateProjectButton;
