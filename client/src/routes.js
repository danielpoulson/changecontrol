import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

/* containers */
import App from './containers/App';
import Home from './containers/Home/home';
import Changes from './containers/Changes';
import ChangeDetail from './containers/ChangeDetail';
import TaskDetail from './containers/Tasks/task-details';
import Tasks from './containers/Tasks/tasks';
import User from './containers/User/user-profile';
import UserPass from './containers/User/user-pass';
import Export from './components/Files/file-export';
import Footer from './layouts/Footer';

function requireAuth(nextState, replace) {
  const authorised = sessionStorage.getItem('authorised');

  if (authorised === 'false' || !authorised) {
    replace({ pathname: '/', state: { nextPathname: nextState.location.pathname } });
  }
}

const Routes = () =>
  <Router>
    <div className="container">
      <App />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/changes" component={Changes} onEnter={requireAuth} />
        <Route path="/change/:id" component={ChangeDetail} onEnter={requireAuth} />
        <Route path="/task/:id" component={TaskDetail} onEnter={requireAuth} />
        <Route path="/tasks" component={Tasks} onEnter={requireAuth} />
        <Route path="/user" component={User} onEnter={requireAuth} />
        <Route path="/user_pass" component={UserPass} onEnter={requireAuth} />
        <Route path="/export" component={Export} onEnter={requireAuth} />
        <Redirect from="/home" to="/" />
      </Switch>
      <Footer />
    </div>
  </Router>;

export default Routes;
