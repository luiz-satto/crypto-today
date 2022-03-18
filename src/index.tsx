import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';

import { Provider } from 'react-redux';
import store from './redux/reducers';

import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/theme.css';
import './assets/css/index.css';

document.title = 'Crypto Today';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Layout />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);