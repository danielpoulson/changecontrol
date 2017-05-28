import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllTasks } from '../../actions/actions_tasks';
import { setUser } from '../../actions/actions_main';
import { getUsers } from '../../actions/actions_users';

import '../../styles/font-awesome/css/font-awesome.min.css';
import './styles/app.css';

/* application components */
import Header from '../../layouts/Header';

export class App extends Component {
  props: {
    children: any,
    getAllTasks: any,
    getUsers: any,
    setUser: any
  }

  componentWillMount() {
    const authorised:any = sessionStorage.getItem('authorised');    
    this.props.getAllTasks();
    this.props.getUsers();
    if (authorised === 'true') {
      this.props.setUser();
    }
    
  }

  render() {
    return (
      <div className="container">
        <div className="">
          <Header />
        </div>
        <div className="">
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(null, { getAllTasks, setUser, getUsers })(App);
