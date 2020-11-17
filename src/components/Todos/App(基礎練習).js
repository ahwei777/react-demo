import "./App.css";
import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from "./constants/breakpoint";

import TodoItem from "./TodoItem";

import { useState, useRef, useEffect, useLayoutEffect } from "react";

function Title({ name }) {
  return (
    <h1
      style={{
        color: "red",
        textAlign: "center",
      }}
      className="title"
    >
      Hello I am {name}
    </h1>
  );
}

function Description({ children }) {
  return <p>{children}</p>;
}

const StyledComponent = styled.p`
  font-size: 40px;
  color: green;
`;

const Wrapper = styled.div`
  background: orange;
  &:hover: {
    color: red;
  }
  div {
    color: yellow;
  }
`;

// restyle - 繼承原屬後再額外設定一 className，如為 component 需再指定 className 傳入位置
const YellowTodoItem = styled(TodoItem)`
  background: yellow;
`;

const MediaDemo = styled.div`
  font-size: 36px;
  background: red;
  ${MEDIA_QUERY_MD} {
    font-size: 24px;
  }
  ${MEDIA_QUERY_LG} {
    font-size: 12px;
  }
`;

const ThemeDemo = styled.div`
  color: ${(props) => props.theme.colors.primary_300};
`;

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos))
}

function App() {
  console.log("start render!");
  const [todos, setTodos] = useState([{ id: 1, content: "demo" }]);
  // ID 與畫面無關不需放入 state 以減少 render 次數，可宣告於外層或以 useRef 方式儲存(改變時不會 rerender)
  const id = useRef(2);
  
  // useEffect 第一個參數為每次 render (改變 state)後都執行的函式，第二個參數為關注的資料，當改變時才會執行函式
  // 當第二個參數傳入空陣列時，因為不會改變故只會在第一次 render 結束後會執行，例如 call API 等
  useEffect(() => {
    console.log('first render finished start use effect')

    // 錯誤處理，第一次為空值
    const todoData = window.localStorage.getItem('todos') || ""
    if (todoData) {
      setTodos(JSON.parse(todoData))
    }
  }, []);

  // 關注 todos，只要其改變時就會執行函式(包含第一次)
  useEffect(() => {
    writeTodosToLocalStorage(todos)
    console.log(JSON.stringify(todos))
  }, [todos])

  const handleButtonAddTodo = () => {
    console.log("button click!");
    setTodos([
      {
        // 讀取 useRef 時以 current 取得
        id: id.current,
        content: value,
      },
      ...todos,
    ]);
    setValue("");
    // 改變 useRef 時一樣以 current 進行操作
    id.current++;
  };

  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

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

  return (
    <div className="App">
      <Title name="David" />
      <Description>How are you?</Description>
      <StyledComponent>StyledComponent demo</StyledComponent>
      <Wrapper>
        yoyo
        <div>i will be yellow</div>
      </Wrapper>

      <MediaDemo>I will change!</MediaDemo>

      <ThemeDemo>Theme Demo</ThemeDemo>

      <TodoItem
        size="XL"
        todo={{ id: 1, content: "demo", isDone: true }}
      ></TodoItem>
      <TodoItem todo={{ id: 1, content: "demo", isDone: false }}></TodoItem>
      <YellowTodoItem todo={{ id: 1, content: "demo" }}></YellowTodoItem>

      <input
        type="text"
        placeholder="todo"
        value={value}
        onChange={handleOnChange}
      />
      <button onClick={handleButtonAddTodo}>Add todo</button>
      {
        todos.map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)
      }
    </div>
  );
}

export default App;
