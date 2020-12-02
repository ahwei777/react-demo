/* eslint-disable import/no-unresolved */
import './App.css';
import React, { memo } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';
import useTodos from './useTodos';

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

export default function TodosRedux() {
  const {
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
  } = useTodos();
  return (
    <Container className="my-5">
      <TodoContainer>
        <Title>Todo List</Title>
        {/* 輸入列 */}
        <AddTodo
          handleAddTodo={handleAddTodo}
          handleSetFilter={handleSetFilter}
        />
        {/* 資訊及篩選列 */}
        <FilterBar
          todos={todos}
          filter={filter}
          handleSetFilter={handleSetFilter}
          handleClearDoneTodos={handleClearDoneTodos}
        />
        {/* Todos */}
        {todos.map((todo) => {
          // 依據 filter 去除不符合條件的 todos
          if (filter === 'active' && todo.isDone) {
            return '';
          }
          if (filter === 'completed' && !todo.isDone) {
            return '';
          }
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleIsDone={handleToggleIsDone}
              handleUpdateTodo={handleUpdateTodo}
              updatingTodo={updatingTodo}
              handleUpdateChange={handleUpdateChange}
              handleUpdateDone={handleUpdateDone}
              editingInput={editingInput}
            />
          );
        })}
      </TodoContainer>
    </Container>
  );
}
