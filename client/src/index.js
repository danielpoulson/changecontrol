import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from './store/configureStore';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-widgets/dist/css/react-widgets.css';
import '../node_modules/react-select/dist/react-select.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';
// eslint-disable-next-line
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
