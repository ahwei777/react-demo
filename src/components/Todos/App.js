import React, { useState, useRef, useEffect, useLayoutEffect, memo , useMemo} from "react";
import TodoItem from "./TodoItem";
import useTodos from "./useTodos";

class Button extends React.Component {
  render() {
    console.log('render Button')
    const { onClick, children } = this.props;
    return <button onClick={onClick}>{children}</button>
  }
}

//function Button({ onClick, children}) {
//  console.log('render button!');
//  return <button onClick={onClick}>{children}</button>
//}

function Test({children}) {
  console.log('render test!')
  return <div>{children}</div>
}
const MemoTest = memo(Test);

function UseMemoTest({ style, children }) {
  console.log('style render!')
  return <div style={style}>{children}</div>
}

function App() {
  // 引入已打包好的 hooks
  const {
    todos,
    setTodos,
    id,
    handleButtonAddTodo,
    handleDeleteTodo,
    handleToggleIsDone,
    value,
    setValue,
    handleInputChange,
  } = useTodos();

  // mount demo
  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, []);

  const style = useMemo(() => {
    console.log('complex calculate')
    return {
      color: value ? "red" : "blue"
    }
  }, [value])

  return (
    <div className="App">
      <input
        type="text"
        placeholder="todo"
        value={value}
        onChange={handleInputChange}
      />
      <MemoTest>MemoTest</MemoTest>
      <UseMemoTest style={style}>useMemoTest</UseMemoTest>
      <Button onClick={handleButtonAddTodo}>Add todo</Button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
        />
      ))}
    </div>
  );
}

export default App;
