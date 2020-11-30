import "./App.css";
import React, { memo } from "react";
import styled from "styled-components";
import { Container, Button, InputGroup, FormControl } from "react-bootstrap";
import TodoItem from "./TodoItem";
import InfoAndFilterBar from "./InfoAndFilterBar";
import useTodos from "./useTodos";

const TodoContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  background: white;
`;
const Title = memo(styled.div`
  color: orange;
  text-align: center;
  font-size: 60px;
  font-weight: bold;
  padding: 20px;
  margin-bottom: 10px;
`);

function TodosApp() {
  // 引入已打包好的 hooks
  const {
    todos,
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
  } = useTodos();
  console.log('todos',todos)
  return (
    <Container className="my-5">
      <TodoContainer>
        <Title>Todo List</Title>
        {/* 輸入列 */}
        <InputGroup className="mb-3">
          <FormControl
            placeholder="請輸入待辦事項"
            value={value}
            onChange={handleInputChange}
          />
          <InputGroup.Append>
            <Button onClick={handleButtonAddTodo}>送出</Button>
          </InputGroup.Append>
        </InputGroup>
        {/* 資訊及篩選列 */}
        <InfoAndFilterBar
          todos={todos}
          todosFilter={todosFilter}
          setTodosFilter={setTodosFilter}
          handleClearDoneTodos={handleClearDoneTodos}
        />
        {/* Todos */}
        {todos.map((todo) => {
          if (todosFilter === "active" && todo.isDone) {
            return "";
          }
          if (todosFilter === "completed" && !todo.isDone) {
            return "";
          }
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleIsDone={handleToggleIsDone}
              handleUpdateClick={handleUpdateClick}
              updatingTodo={updatingTodo}
              setUpdatingTodo={setUpdatingTodo}
              updateValue={updateValue}
              handleUpdateChange={handleUpdateChange}
              editingInput={editingInput}
            />
          );
        })}
      </TodoContainer>
    </Container>
  );
}

export default TodosApp;
