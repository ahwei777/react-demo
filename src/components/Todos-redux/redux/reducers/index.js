/* eslint-disable import/no-unresolved */
import { combineReducers } from 'redux';
import todosReducer from './todos';
import filterReducer from './filter';
import updatingTodoReducer from './updatingTodo';

export default combineReducers({
  todoState: todosReducer,
  filterState: filterReducer,
  updatingTodoState: updatingTodoReducer,
});
