import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

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
  color: blue;
  font-size: ${(props) => (props.size === "XL" ? "20px;" : "12px;")}
    ${(props) =>
      props.$isDone &&
      `
    text-decoration: line-through;
  `};
`;

const TodoButtonWrapper = styled.div``;

const Button = styled.button`
  padding: 4px;
  color: black;

  &:hover {
    transform: scale(1.2);
  }

  & + & {
    margin-left: 10px;
  }
`;

// restyle - 繼承原屬後再額外傳入 className
const RedButton = styled(Button)`
  color: red;
`;

/*
class TodoItemC extends React.Component {
  // 初始化建構子
  constructor(props) {
    // 繼承父類 React.Component 
    super(props)
    // 強制綁定函式的 this 為 TodoItemC 這個 instance，使用時才能正確地指向 props
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  // 宣告會用到的函式
  handleToggleClick() {
    console.log(this) // undefined
    const { handleToggleIsDone, todo } = this.props
    handleToggleIsDone(todo.id);
  }

  handleDeleteClick() {
    const { handleDeleteTodo, todo } = this.props
    handleDeleteTodo(todo.id);
  }

  render() {
    console.log('render todo')
    const {
      className,
      size,
      todo,
      handleDeleteTodo,
      handleToggleIsDone,
    } = this.props;

    return (
      <TodoItemWrapper className={className} data-todo-id={todo.id}>
        <TodoContent $isDone={todo.isDone} size={size}>
          {todo.content}
        </TodoContent>
        <TodoButtonWrapper>
          <Button onClick={this.handleToggleClick}>
            {todo.isDone ? "未完成" : "已完成"}
          </Button>
          <RedButton onClick={this.handleDeleteClick}>刪除</RedButton>
        </TodoButtonWrapper>
      </TodoItemWrapper>
    )
  }
} 
*/

// 合併包成完整的 component，設定參數傳入位置
const TodoItem = ({
  className,
  size,
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
}) => {
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id);
  };
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };
  return (
    <TodoItemWrapper className={className} data-todo-id={todo.id}>
      <TodoContent $isDone={todo.isDone} size={size}>
        {todo.content}
      </TodoContent>
      <TodoButtonWrapper>
        <Button onClick={handleToggleClick}>
          {todo.isDone ? "未完成" : "已完成"}
        </Button>
        <RedButton onClick={handleDeleteClick}>刪除</RedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
};

export default TodoItem;

TodoItem.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isDone: PropTypes.bool,
  }),
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
}