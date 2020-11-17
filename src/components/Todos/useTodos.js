import { useState, useEffect, useRef, useCallback } from "react";

import useInput from "./useInput";

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', todos.length === 0 ? [] : JSON.stringify(todos))
}

export default function useTodos() {
  // 引入已打包好的 hooks
  const { value, setValue, handleInputChange } = useInput();

  // ID 與畫面無關不需放入 state 以減少 render 次數，可宣告於外層或以 useRef 方式儲存(改變時不會 rerender)
  const id = useRef(1);

  // 只有初始化時要取出資料，但後續 render 時都還是會執行造成效能浪費，改為傳入函式就只會執行一次
  const [todos, setTodos] = useState(() => {
    console.log('init')
    let todoData = window.localStorage.getItem('todos') //初始空值錯誤處理(null)
    if (todoData) {
      todoData = JSON.parse(todoData);
      // 已有資料時 id 接續原 local 內最後一筆資料嚴格遞增
      id.current = todoData[0].id + 1;
    } else {
      todoData = [];
    }
    return todoData;
  });

  // useEffect 第一個參數為每次 render (改變 state)後都執行的函式，第二個參數為關注的資料，當改變時才會執行函式
  // 當第二個參數傳入空陣列時，因為不會改變故只會在第一次 render 結束後會執行，例如 call API 等
  useEffect(() => {
    writeTodosToLocalStorage(todos)
    console.log("useEffect: todos", JSON.stringify(todos))

    //clean up function 
    return () => {
      console.log("clearEffect: todos", JSON.stringify(todos))
    }
  }, [todos]) // 關注 todos，只要其改變時就會執行函式(包含第一次)

  const handleButtonAddTodo = useCallback(() => {
    console.log("button click!");
    console.log(value)
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
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  //回傳打包好的函式與需要變數
  return {
    todos,
    setTodos,
    id,
    handleButtonAddTodo,
    handleDeleteTodo,
    handleToggleIsDone,
    value,
    setValue,
    handleInputChange,
  };
}
