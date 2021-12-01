import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  render() {
    const { project_tasks_prop } = this.props; //Backlog's props received from parent ProjectBoard
    const tasks = project_tasks_prop.map((project_task) => (
      <ProjectTask key={project_task.id} project_task={project_task} />
    ));

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    for (let i = 0; i < tasks.length; i++) {
      // console.log(tasks[i]) ... this is how we know where the status is exactly
      if (tasks[i].props.project_task.status === "TO_DO") {
        todoItems.push(tasks[i]);
      } else if (tasks[i].props.project_task.status === "IN_PROGRESS") {
        inProgressItems.push(tasks[i]);
      } else if (tasks[i].props.project_task.status === "DONE") {
        doneItems.push(tasks[i]);
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div
                className="card-header"
                style={{
                  backgroundColor: "#c9c9ac94",
                  color: "rgb(46, 0, 61)",
                }}
              >
                <h3>TO DO</h3>
              </div>
            </div>
            {todoItems}
            {
              //insert tasks here
            }
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div
                className="card-header"
                style={{
                  backgroundColor: "#c9c9ac94",
                  color: "rgb(46, 0, 61)",
                }}
              >
                <h3>PENDING</h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div
                className="card-header"
                style={{
                  backgroundColor: "#c9c9ac94",
                  color: "rgb(46, 0, 61)",
                }}
              >
                <h3>COMPLETE</h3>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
