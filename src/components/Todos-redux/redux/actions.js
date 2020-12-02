import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  CLEAR_DONE_TODO,
  SET_FILTER,
  SET_UPDATING_TODO,
  UPDATE_TODO,
} from './actionTypes';
// action creator 直接回傳 action object ，方便重用
export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      content,
    },
  };
}
export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}
export function updateTodo(id, content) {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      content,
    },
  };
}
export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
}
export function clearDoneTodo() {
  return {
    type: CLEAR_DONE_TODO,
  };
}
export function setFilter(name) {
  return {
    type: SET_FILTER,
    payload: {
      name,
    },
  };
}
export function setUpdatingTodo(id, value) {
  return {
    type: SET_UPDATING_TODO,
    payload: {
      id,
      value,
    },
  };
}
