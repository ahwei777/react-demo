/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import combineReducers from './reducers';

export default createStore(
  combineReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
