/* eslint-disable react/jsx-filename-extension */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { store } from './redux';

import './typescript1.ts';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
