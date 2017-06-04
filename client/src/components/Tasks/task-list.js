// @flow
//TODO: Convert into a functional component
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TaskTable from './task-table';

class TaskList extends Component {
  props: {
    onSelectTask: any,
    newTask: any,
    type: string,
    tasksTab: string,
    tasklist: any
  }

  render() {

    let hideButton = '';

    if (this.props.type === 'All') {
      hideButton = 'hidden';
    }

    return (
      <div className={this.props.tasksTab}>
        <div>
          <TaskTable
            tasklist={this.props.tasklist}
            onSelectTask={this.props.onSelectTask} />
        </div>
        <div className={hideButton}>
          <Link to="/task/new">
            <input type="submit" value="New Task" className="btn btn-success pull-left" onClick={this.props.newTask} />
          </Link>
        </div>
      </div>
    );
  }
}

export default TaskList;
