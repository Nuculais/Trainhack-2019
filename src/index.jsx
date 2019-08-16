import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider as StoreProvider
} from 'react-redux';

import RouteHandler from './router/RouteHandler';

import App from './App';

import createStore from './store';
import * as actions from './store/actions';

import * as serviceWorker from './serviceWorker';

import './index.scss';

const store = window.store = createStore({
  config: {
    intercomAppId: process.env.REACT_APP_INTERCOM_APP_ID,
  },
});
window.actions = actions;

ReactDOM.render(
  <StoreProvider store={store}>
    <RouteHandler store={store}>
      <App />
    </RouteHandler>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
