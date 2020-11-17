import React from "react";
import TodoItem from "./TodoItem";
import useTodos from "./useTodos";

function AppPropTypes() {
  // 引入已打包好的 hooks
  const {
    todos,
    handleButtonAddTodo,
    handleDeleteTodo,
    handleToggleIsDone,
    value,
    handleInputChange,
  } = useTodos();

  return (
    <div className="App">
      <input
        type="text"
        placeholder="todo"
        value={value}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonAddTodo}>Add todo</button>
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

export default AppPropTypes;