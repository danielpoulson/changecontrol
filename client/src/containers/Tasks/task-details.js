import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import TaskForm from '../../components/Tasks/task-form';
import ErrorPanel from '../../components/Common/error-panel';
import toastr from 'toastr';
import {taskFormIsValid} from './task-form.validation';
import {usersFormattedForDropdown} from '../../selectors/selectors';

import * as taskActions from '../../actions/actions_tasks';
import * as mainActions from '../../actions/actions_main';

class TaskDetail extends React.Component {
  props: {  
    deleteTask: any,
    main: any,
    mainActions: any,
    newTask: any,
    setLoading: any,
    editTask: any,
    addTask: any,
    task: any,
    taskActions: any,
    users: any,
    match: {
      params: {
        id: string
      }
    }
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      dirty: false,
      errors: [],
      errorsObj: {},
      hideDelete: props.main.user.role !== 'admin' || props.newTask === true ? 'hidden' : 'btn btn-danger',
      newTask: false,
      submitting: false,
      taskId: props.match.params.id,
      task: Object.assign({}, props.task),
      status: [
        { value: 1, text: 'Task - Not Started (New)' },
        { value: 2, text: 'Task - On Track' },
        { value: 3, text: 'Task - In Concern' },
        { value: 4, text: 'Task - Behind Schedule' },
        { value: 5, text: 'Task - Completed' }
      ]
    };

    this.cancelTask = this.cancelTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.updateTaskState = this.updateTaskState.bind(this);
    this.updateTaskStateDate = this.updateTaskStateDate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.task._id !== nextProps.task._id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({task: Object.assign({}, nextProps.task)});
    }
  }

  cancelTask(event) {
    event.preventDefault();
    this.props.mainActions.setLoading({ loading: false });
  }

  deleteTask(event) {
    event.preventDefault();
    this.props.mainActions.setLoading({ loading: false });
    const _id = this.state.taskId;
    this.props.taskActions.deleteTask(_id);
    toastr.error('Task has been deleted', 'Task Detail', { timeOut: 1000 });
  }

  saveTask(event) {
    event.preventDefault();

    const _SourceId = this.props.main.MainId;
    let _task = this.state.task;

    let validation = taskFormIsValid(_task);
    this.setState({errors: validation.errors});
    this.setState({errorsObj: validation.errorsObj});

    if(!validation.formIsValid) {
      return;
    }

    if (this.state.taskId !== 'new') {
      _task.TKChampNew = _task.TKChamp !== this.props.task.TKChamp;
      this.props.taskActions.editTask(_task);
    } else {
      _task.TKStat = _task.TKStat || 1;
      _task.SourceId = _SourceId;
      this.props.taskActions.addTask(_task);
    }

    toastr.success('Task has been saved', 'Task Detail', { timeOut: 1000 });
    this.props.mainActions.setLoading({ loading: false });
  }

  updateTaskState(event) {
    const field = event.target.name;
    let task = this.state.task;
    task[field] = event.target.value;
    return this.setState({task: task});
  }

  updateTaskStateDate(field, value) {
    // this.setState({dirty: true});
    let task = this.state.task;
    task[field] = value;
    return this.setState({task: task});
  }

  render() {

    const formStyle = {
      backgroundColor: '#fcfffc',
      border: 'solid 1px',
      borderRadius: 4,
      paddingTop: 10,
      paddingBottom: 50
    };

    const taskTitle = this.state.taskTitle ? this.state.taskTitle : 'New Task';

    return (
        <div>
          <div className="">
            <div className="section-header">
              <p className="section-header-text-sub">{taskTitle}</p>
            </div>
          </div>

          <div style={formStyle}>
            {this.state.errors.length > 0 ? <ErrorPanel errors={this.state.errors}/> : ""}
            <TaskForm
              errors={this.state.errorsObj}
              hideDelete={this.state.hideDelete}
              onCancel={this.cancelTask}
              onChange={this.updateTaskState}
              onDateChange={this.updateTaskStateDate}
              onDeleteTask={this.deleteTask}
              onSaveTask={this.saveTask}
              status={this.state.status}
              submitting={this.state.submitting}
              task={this.state.task}
              users={this.props.users} />
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {

  return {
    main: state.main,
    task: state.task,
    users: usersFormattedForDropdown(state.users)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(taskActions, dispatch),
    mainActions: bindActionCreators(mainActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
