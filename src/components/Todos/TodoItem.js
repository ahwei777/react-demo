import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

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
  ${(props) =>
    props.$isDone && `text-decoration: line-through;`
  }
`;
const TodoContentEditing = styled.input`
  margin-right: 16px;
  word-break: break-word;
  padding: 6px;
  border: none;
  font-size: 26px;
  flex: 1;
  ${(props) =>
    props.$isDone && `text-decoration: line-through;`
  }
  
  outline: 1px solid grey;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
`;

const TodoButtonWrapper = styled.div``;

// 合併包成完整的 component，設定參數傳入位置
const TodoItem = ({
  className,
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
  updatingTodo,
  setUpdatingTodo,
  handleUpdateClick,
  updateValue,
  handleUpdateChange,
}) => {
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id);
  };
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  return (
    <TodoItemWrapper className={className} data-todo-id={todo.id}>
      {(updatingTodo && Number(updatingTodo.id) === todo.id)
      ?
        (<TodoContentEditing $isDone={todo.isDone} onDoubleClick={handleUpdateClick} data-todo-id={todo.id} value={updateValue} onChange={handleUpdateChange} onBlur={() => {setUpdatingTodo(false)}} className={"editing"}>
        </TodoContentEditing>)
      :
        (<TodoContent $isDone={todo.isDone} onDoubleClick={handleUpdateClick} data-todo-id={todo.id}>
          {todo.content}
        </TodoContent>)
      }

      <TodoButtonWrapper>
        <Button onClick={handleToggleClick} variant={todo.isDone ? "secondary" : "success"}>
          {todo.isDone ? "未完成" : "已完成"}
        </Button>{" "}
        <Button variant="danger" onClick={handleDeleteClick}>刪除</Button>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
};

export default TodoItem;

TodoItem.propTypes = {
  className: PropTypes.string,
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isDone: PropTypes.bool,
  }),
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
}
