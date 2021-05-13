import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import appReducers from './reducers'
import appSaga from './saga'

import App from './App';

import reportWebVitals from './reportWebVitals';
import Firebase from './components/Firebase';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(appReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(appSaga);

ReactDOM.render(
  <Provider store={store}>
    <App firebase={new Firebase()}/>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
