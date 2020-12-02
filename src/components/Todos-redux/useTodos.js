/* eslint-disable import/no-unresolved */
import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTodos,
  selectFilter,
  selectUpdatingTodo,
} from './redux/selectors';
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  clearDoneTodo,
  setFilter,
  setUpdatingTodo,
  updateTodo,
} from './redux/actions';

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem(
    'todos',
    todos.length === 0 ? [] : JSON.stringify(todos),
  );
}

export default function useTodos() {
  // useSelector(store => store.todoState.todos) store 中有多個 state ，將選擇過程另外抽出
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const updatingTodo = useSelector(selectUpdatingTodo);
  const dispatch = useDispatch();
  const editingInput = useRef(null);

  // 關注 todos，改變時就執行函式(含初始化)
  useEffect(() => {
    writeTodosToLocalStorage(todos);
    // (return clean up function)
  }, [todos]);

  // 關注 updatingTodo，改變時就執行函式(含初始化)
  useEffect(() => {
    // 將輸入游標移到該 DOM 元素
    if (updatingTodo.id) {
      editingInput.current.focus();
    }
  }, [updatingTodo]);

  // 定義子 component 會使用的函式
  const handleAddTodo = useCallback(
    (value) => {
      dispatch(addTodo(value));
    },
    [dispatch],
  );
  const handleDeleteTodo = id => dispatch(deleteTodo(id));
  const handleToggleIsDone = id => dispatch(toggleTodo(id));
  const handleSetFilter = useCallback(
    (name) => {
      if (todos.length > 0) dispatch(setFilter(name));
    },
    [todos.length, dispatch],
  );
  const handleClearDoneTodos = () => {
    if (todos.length > 0) dispatch(clearDoneTodo());
  };
  const handleUpdateTodo = (id, value) => {
    dispatch(setUpdatingTodo(id, value));
  };
  const handleUpdateChange = (id, value) => {
    dispatch(setUpdatingTodo(id, value));
    dispatch(updateTodo(id, value));
  };
  const handleUpdateDone = () => {
    dispatch(setUpdatingTodo(null, null));
  };

  // 回傳打包好的函式與需要變數
  return {
    todos,
    filter,
    updatingTodo,
    handleAddTodo,
    handleSetFilter,
    handleClearDoneTodos,
    handleDeleteTodo,
    handleToggleIsDone,
    handleUpdateTodo,
    handleUpdateChange,
    handleUpdateDone,
    editingInput,
  };
}
