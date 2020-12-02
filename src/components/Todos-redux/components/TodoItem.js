/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`;
const TodoContent = styled.div`
  margin-right: 16px;
  word-break: break-word;
  padding: 6px;
  border: none;
  font-size: 26px;
  flex: 1;
  ${props => props.$isDone && 'text-decoration: line-through;'}
`;
const TodoContentEditing = styled.input`
  margin-right: 16px;
  word-break: break-word;
  padding: 6px;
  border: none;
  font-size: 26px;
  flex: 1;
  outline: 1px solid grey;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  ${props => props.$isDone && 'text-decoration: line-through;'}
`;
const TodoButtonWrapper = styled.div``;

// 合併包成完整的 component，設定參數傳入位置
export default function TodoItem({
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
  handleUpdateTodo,
  updatingTodo,
  handleUpdateChange,
  handleUpdateDone,
  editingInput,
}) {
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id);
  };
  const handleUpdateClick = (e) => {
    if (todo.isDone) return;
    const id = e.target.getAttribute('data-todo-id');
    const value = e.target.innerText;
    handleUpdateTodo(id, value);
  };
  const handleUpdateOnChange = (e) => {
    const id = e.target.getAttribute('data-todo-id');
    const { value } = e.target;
    handleUpdateChange(id, value);
  };

  return (
    <TodoItemWrapper data-todo-id={todo.id}>
      {/* 更新觸發時，比對更新的 ID 與該 todo 的 ID，相符則 render 輸入框，不相符則 render div */}
      {updatingTodo.id && Number(updatingTodo.id) === todo.id ? (
        <TodoContentEditing
          data-todo-id={todo.id}
          value={updatingTodo.value}
          onChange={handleUpdateOnChange}
          onBlur={handleUpdateDone}
          ref={editingInput}
        />
      ) : (
        <TodoContent
          $isDone={todo.isDone}
          data-todo-id={todo.id}
          onDoubleClick={handleUpdateClick}
        >
          {todo.content}
        </TodoContent>
      )}
      <TodoButtonWrapper>
        <Button
          onClick={handleToggleClick}
          variant={todo.isDone ? 'secondary' : 'success'}
        >
          {todo.isDone ? '未完成' : '已完成'}
        </Button>
        {' '}
        <Button variant="danger" onClick={handleDeleteClick}>
          刪除
        </Button>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isDone: PropTypes.bool,
  }).isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  handleToggleIsDone: PropTypes.func.isRequired,
  handleUpdateTodo: PropTypes.func.isRequired,
  updatingTodo: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  handleUpdateChange: PropTypes.func.isRequired,
  handleUpdateDone: PropTypes.func.isRequired,
  editingInput: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};
