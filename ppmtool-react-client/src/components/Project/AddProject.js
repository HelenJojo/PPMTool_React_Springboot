import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";

class AddProject extends Component {
  constructor() {
    super();

    //The state object is where you store property values that belongs to the component.
    //When the state object changes, the component re-renders.
    //The state object is initialized in the constructor
    //Refer to the state object anywhere in the component by using the this.state.propertyname syntax

    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      startDate: "",
      endDate: "",
      errors: {},
    };

    //We bind event handlers in React purely because of the way this keyword works in JS
    //if we dont do this, [this] is undefined
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      //To change a value in the state object, use the this.setState() method.
      //When a value in the state object changes, the component will re-render,
      // meaning that the output will change according to the new value(s).
      this.setState({ errors: nextProps.errors });
    }
  }

  /* Just like HTML DOM events, React can perform actions based on user events.
    React has the same events as HTML: click, change, mouseover etc.

    React events are written in camelCase syntax:
      onClick instead of onclick.
    React event handlers are written inside curly braces:
      onClick={shoot}  instead of onClick="shoot()".
*/

  //below are objects defined in this class component ...in place of shoot which are called
  // down below on lines like 87 and 87
  //You can control the submit action by adding an event handler "e" in the onSubmit/onChange attribute for the <form>
  //Check out React Forms: https://www.w3schools.com/REACT/react_forms.asp
  //e.target.(value) or (name) referring to each input's name and value attribute like on line 107 and 108

  //event handler for onChange
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault(); //this will prevent the default behavior of form submission (which refreshes/reloads the page causing loss of data) so that we dont lose the data
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };
    this.props.createProject(newProject, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        {
          //check name attribute input fields...should be consistent as POJO in backend
          //create constructor
          //initialize state with default (empty) values in constructor
          //set value on input fields to whatever's on component state
          //create onChange function so that when user changes on form, it gets updated to state
          //set onChange on each input field
          //bind at constructor (level) instead of for each input field
          //check state change in the react extension
        }

        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Create Project form</h5>
                <hr />
                {/* Handling forms is about how you handle the data when it
                changes value or gets submitted. In HTML, form data is usually
                handled by the DOM. In React, form data is usually handled by
                the components. When the data is handled by the components, all
                the data is stored in the component state. You can control
                changes by adding event handlers in the onChange attribute. We
                can use the useState Hook to keep track of each inputs value and
                provide a "single source of truth" for the entire application.
                */}
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      //the 2nd param of classnames says apply class "is-invalid" whenever/if there are errors in the projectName
                      className={classnames(
                        "custom_input_border form-control form-control-lg ",
                        {
                          "is-invalid": errors.projectName,
                        }
                      )}
                      placeholder="Project Name"
                      name="projectName"
                      value={this.state.projectName}
                      onChange={this.onChange} //we dont want this to be a function call like this.onChange()
                      //we actually want it to be a function (declaration)
                      //event handler should be a FUNCTION not a function call!!
                    />
                    {errors.projectName && (
                      <div className="invalid-feedback">
                        {errors.projectName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames(
                        "custom_input_border form-control form-control-lg ",
                        {
                          "is-invalid": errors.projectIdentifier,
                        }
                      )}
                      placeholder="Unique Project ID"
                      name="projectIdentifier"
                      value={this.state.projectIdentifier}
                      onChange={this.onChange}
                    />
                    {errors.projectIdentifier && (
                      <div className="invalid-feedback">
                        {errors.projectIdentifier}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classnames(
                        "custom_input_border form-control form-control-lg ",
                        {
                          "is-invalid": errors.description,
                        }
                      )}
                      placeholder="Project Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}{" "}
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="custom_input_border form-control form-control-lg"
                      name="startDate"
                      value={this.state.startDate}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="custom_input_border form-control form-control-lg"
                      name="endDate"
                      value={this.state.endDate}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    className="submit_button btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors, //athough we have errors in our state, we need to use/extract them as this component's props
});

//this is how we "connect" the component to the state
export default connect(mapStateToProps, { createProject })(AddProject);

//GREAT video to understand the basics of form handling:
//https://www.youtube.com/watch?v=7Vo_VCcWupQ&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=21
