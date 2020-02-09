import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import './styles/index.scss';

import App from './components/App';
import reducers from './reducers';

import { Router } from 'react-router-dom';

import history from './history';
import { ToastProvider } from 'react-awesome-toasts';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk)) // this is to hook up redux dev tools
);

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider timeout="1350">
      <Router history={history}>
        <App />
      </Router>
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
);