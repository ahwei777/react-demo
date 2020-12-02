import { useState, useEffect, useRef, useCallback } from "react";
import useInput from "./useInput";

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem(
    "todos",
    todos.length === 0 ? [] : JSON.stringify(todos)
  );
}

export default function useTodos() {
  // 引入已打包好的 hooks
  const { value, setValue, handleInputChange } = useInput();

  // ID 與畫面無關不需放入 state 以減少 render 次數，可宣告於外層或以 useRef 方式儲存(改變時不會 rerender)
  const id = useRef(1);

  // 只有初始化時要取出資料，但後續 render 時都還是會執行造成效能浪費，改為傳入函式就只會執行一次
  const [todos, setTodos] = useState(() => {
    console.log("todos init");
    let todoData = window.localStorage.getItem("todos"); //初始空值錯誤處理(null)
    if (todoData) {
      todoData = JSON.parse(todoData);
      // 已有資料時 id 接續原 local 內最後一筆資料嚴格遞增
      id.current = todoData[0].id + 1;
    } else {
      todoData = [];
    }
    return todoData;
  });
  console.log(todos)
  const [todosFilter, setTodosFilter] = useState(null);
  const [updatingTodo, setUpdatingTodo] = useState(null);
  const [updateValue, setUpdateValue] = useState(null);
  const editingInput = useRef(null);

  // useEffect 第一個參數為函式，當第二個參數關注目標改變時才會執行(傳入[]時因不會改變故只在第一次 render 後執行，如 call API)

  // 關注 todos，改變時就執行函式(含初始化)
  useEffect(() => {
    writeTodosToLocalStorage(todos);
    console.log("useEffect: todos", JSON.stringify(todos));
    // (return clean up function)
  }, [todos]);

  // 關注 updatingTodo，改變時就執行函式(含初始化)
  useEffect(() => {
    // 將輸入游標移到該 DOM 元素
    if (updatingTodo) {
      editingInput.current.focus();
    }
  }, [updatingTodo]);

  const handleButtonAddTodo = useCallback(() => {
    setTodos([
      {
        // 讀取 useRef 時以 current 取得
        id: id.current,
        content: value,
        isDone: false,
      },
      ...todos,
    ]);
    setValue("");
    // 改變 useRef 時一樣以 current 進行操作
    id.current++;
  }, [setValue, todos, value]);

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        // 不符合 ID 的保留
        if (todo.id !== id) return todo;
        return {
          ...todo,
          // 符合 ID 的變換狀態
          isDone: !todo.isDone,
        };
      })
    );
  };
  const handleUpdateClick = (e) => {
    setUpdateValue(e.target.innerText);
    setUpdatingTodo({
      id: e.target.getAttribute("data-todo-id"),
    });
  };

  const handleUpdateChange = (e) => {
    setUpdateValue(e.target.value);
    setTodos(
      todos.map((todo) => {
        // 不符合指定刪除 ID 的保留
        if (todo.id !== Number(e.target.getAttribute("data-todo-id")))
          return todo;
        return {
          ...todo,
          content: e.target.value,
        };
      })
    );
  };

  const handleClearDoneTodos = useCallback(() => {
    // 未完成的才保留
    setTodos(todos.filter((todo) => !todo.isDone));
  }, [todos]);

  //回傳打包好的函式與需要變數
  return {
    todos,
    setTodos,
    id,
    handleButtonAddTodo,
    handleDeleteTodo,
    handleToggleIsDone,
    handleUpdateClick,
    updatingTodo,
    setUpdatingTodo,
    updateValue,
    handleUpdateChange,
    value,
    handleInputChange,
    todosFilter,
    setTodosFilter,
    handleClearDoneTodos,
    editingInput
  };
}
