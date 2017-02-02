import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

import './index.css';

import router from './router';

const store = configureStore();

const App = ({ store }) => (
  <Provider store={store}>
    {router}
  </Provider>
);

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);