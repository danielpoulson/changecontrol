//SYNC 11/03/2017 DP
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getTraffic } from '../../utils/status';

type Props = {
  task: any,
  listType: string,
  getTask: any
}

const TaskRow = ({task, listType, getTask}: Props) => {
  const minColTarget = {
    minWidth: 100
  };
  const minColChamp = {
    minWidth: 140
  };
  const capa = task.TKCapa === 1 ? 'fa fa-product-hunt' : '';
  return (
    <tr>
      <td>
        { (listType === 'All') ? 
          <Link
            to={`/change/${task.SourceId}`}
            className="link-unstyled"
            onClick={getTask} >
            {task.SourceId} - {task.TKName} <i className={capa}></i>
          </Link> 
          :
          <Link
            to={`/task/${task._id}`}
            className="link-unstyled"
            onClick={getTask} >
            {task.SourceId} - {task.TKName} <i className={capa}></i>
          </Link> 
        }
      </td>
      <td style={minColTarget}>{moment(task.TKTarg).format('DD/MM/YYYY')}</td>
      <td style={minColChamp}>{task.TKChamp}</td>
      <td><i className={getTraffic(task.TKTarg, task.TKStat)}></i></td>
    </tr>
  );
};

export default TaskRow;
