//SYNC Ver.002 DP
import React from 'react';
import TaskRow from './task-row';

type Props = {
  tasklist: any,
  onSelectTask: any
}

const TaskTable = ({tasklist, onSelectTask} : Props) => {
  const _tasks = tasklist;
  let tasks = [];

  if (_tasks !== undefined) {
    tasks = _tasks.map((task, i) => <TaskRow key={task._id} task={task} onSelectTask={onSelectTask} />);
  }

  return (
    <div className="panel panel-success">
      <table className="table table-hover project-table dp_point">
        <thead className="print-table-head">
          <tr>
            <th> Project Id and Task Name </th>
            <th> Target Date </th>
            <th> Champion </th>
            <th> Status </th>
          </tr>
        </thead>
        <tbody className="panel-body dpHand">{tasks}</tbody>
      </table>
    </div>
  );
};

export default TaskTable;
