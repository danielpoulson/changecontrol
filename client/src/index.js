import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Redirect, browserHistory } from 'react-router';
// import { createHashHistory } from 'history';
import configureStore from './store/configureStore';
import routes from './routes';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-widgets/dist/css/react-widgets.css';
import '../node_modules/react-select/dist/react-select.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="home" />
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
