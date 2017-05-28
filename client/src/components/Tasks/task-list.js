// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TaskTable from './task-table';
import { getTask } from '../../actions/actions_tasks';
import { getChange } from '../../actions/actions_changes';
import { setMain } from '../../actions/actions_main';

class TaskList extends Component {
  props: {
    type: string,
    tasksTab: string,
    tasklist: any,
    setMain: any,
    getChange: any,
    getTask: any
  }

  state = {};

  handleClick = (i) => {
    if (this.props.type === 'All') {
      const ccNo:string = this.props.tasklist[i].SourceId;
      this.props.setMain({ MainId: ccNo, CurrentMode: 'change', loading: true });
      this.props.getChange(ccNo);
    } else {
      const _id = this.props.tasklist[i]._id;
      this.props.getTask(_id);
    }
  };

  newTask = () => {
    this.props.getTask('new');
  };

  render() {

    let hideButton = '';

    if (this.props.type === 'All') {
      hideButton = 'hidden';
    }

    return (
      <div className={this.props.tasksTab}>
        <div>
          <TaskTable
            listType= {this.props.type}
            tasklist={this.props.tasklist}
            handleClick={this.handleClick} />
        </div>
        <div className={hideButton}>
          <Link to="/task/new">
            <input type="submit" value="New Task" className="btn btn-success pull-left" onClick={this.newTask} />
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null,
  { getTask, getChange, setMain })(TaskList);
