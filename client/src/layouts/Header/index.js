import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../../components/Login/login';
import NavBar from '../../layouts/Navigation/nav-bar';

import { getUserDashboard, login } from '../../actions/actions_main';
import './styles.css';

class Header extends Component {
  props: {
    getUserDashboard: any,
    login: any,
    fullname: string
  }
  constructor(props){
    super(props);
    this.state = {
      login: {}
    };
    this.onLogin = this.onLogin.bind(this);
    this.setStateLogin = this.setStateLogin.bind(this);
  }

  onLogin(e) {
    e.preventDefault();
    this.props.login(this.state.login);
    this.props.getUserDashboard(this.state.login.username);
  }

  setStateLogin(evt) {
    let _login = this.state.login;
    const name = evt.target.name;
    const value = evt.target.value;
    _login[name] = value;
    return this.setState({ login: _login });
  }

  render() {
    const textStyle = {
      color: 'white'
    };

    const loginStyle = {
      marginTop: 5
    };

    const changePassword = {
      color: 'white',
      paddingRight: 18 
    };


    return (
        <div>
            <div className="topband">
                <section className="col-sm-12 dp-nav-section ">
                    <div className="col-sm-5">
                        <h3 className="topband_h1">NPI - Change Control</h3>
                    </div>
                    <div className="col-sm-7" style={loginStyle}>
                        {!this.props.fullname ?
                          <Login
                            login={this.state.login}
                            onChange={this.setStateLogin}
                            onLogin={this.onLogin}
                          /> :
                            <p style={textStyle} className="pull-right">Welcome: {this.props.fullname}</p>
                        }
                    </div>
                    <Link to="/user_pass" className="pull-right" style={changePassword} >
                      {this.props.fullname ? 'Change Password?' : '' }
                    </Link>
                </section>

            </div>
            <NavBar />
        </div>
    );
  }
}

export default connect(
  state => ({ fullname: state.main.user.fullname }), { getUserDashboard, login }
)(Header);
