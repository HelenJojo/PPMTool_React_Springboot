import React, { Component } from "react";
import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    //
    //extracting projects property from the props.project object...technique of destructuring
    //so now you can just use projects to refer to it instead of this.props.projects
    //for example...const {name, heroName} = this.props where name and heroName were passed in as attributes
    //we are simply extracting the necessary props...your props object could contain 10 diff props but
    //you can destructure only the ones you want
    //so now you wont have to refer to them in the render() as this.props.hero...rather just hero
    const { projects } = this.props.project; //destructuring from props only those that i need //gets us this.props.project.projects
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1
                className="display-4 text-center"
                style={{
                  fontFamily: "papyrus",
                }}
              >
                Projects
              </h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {/* WIthout the key, you will receive a warning that there is no
              "key" provided for the list items. Keys allow React to keep track
              of elements. This way, if an item is updated or removed, only that
              item will be re-rendered instead of the entire list. Keys need to
              be unique to each sibling. But they can be duplicated globally. 
            Warning in console like: Each child in an array or iterator should have a unique "key" prop
            */}
              {projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
};

//conventional to name the function mapStateToProps
//this function gets the redux state as param
//and returns an object
//the state from the redux store is mapped to our component, Dashboard's props
// so project is now a prop to Dashboard
//this function is for when you want to access the redux state in your component
//it gets the redux state as a parameter
const mapStateToProps = (state) => ({
  project: state.project, //from the index.js in /reducers...extracting state as props...gonna get list of projects since the action we are mapping to is getProjectts
});

//The connect function connects a React component to the redux store
export default connect(mapStateToProps, { getProjects })(Dashboard); //2
