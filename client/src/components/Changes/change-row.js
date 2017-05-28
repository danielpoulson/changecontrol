import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {getStatCC} from '../../utils/status';
import './change-list.css';

type Props = {
  change: any,
  getChange: any
}

const ChangeRow = ({change, getChange} : Props) => {

  return (
    
      <tr>        
          <td>
            <Link 
              to={`/change/${change.CC_No}`}
              className="link-unstyled"
              onClick={getChange.bind(null, change.CC_No)} >
              {change.CC_No} - {change.CC_Descpt} 
            </Link> 
          </td>
          <td> {change.CC_Champ} </td>
          <td> {moment(change.CC_TDate).format('DD/MM/YYYY')} </td>
          <td className="colaligncenter" ><i className={getStatCC(change.CC_Stat)} ></i></td>
      </tr>
  );
};

export default ChangeRow;
