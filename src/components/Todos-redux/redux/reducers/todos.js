import {
  ADD_TODO,
  DELETE_TODO,
  CLEAR_DONE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
} from '../actionTypes';

// 初始 id
let todoId = 0;
// 只有初始化時要取出資料，但後續 render 時都還是會執行造成效能浪費，改為傳入函式就只會執行一次
let todoData = window.localStorage.getItem('todos');
if (todoData) {
  todoData = JSON.parse(todoData);
  // 已有資料時 id 接續原 local 內最後一筆資料嚴格遞增
  todoId = todoData[0].id + 1;
} else {
  // 空值錯誤處理(null)
  todoData = [];
}

const initialState = {
  todos: todoData,
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      todoId += 1;
      return {
        // 注意未更改部分仍要傳入保留
        ...state,
        todos: [
          // 新增的在上方
          {
            // 參數
            id: todoId,
            content: action.payload.content,
            isDone: false,
          },
          // 原有的在後方
          ...state.todos,
        ],
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    }
    case CLEAR_DONE_TODO: {
      return {
        ...state,
        // 只留下 isDone 為 false
        todos: state.todos.filter(todo => !todo.isDone),
      };
    }
    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          // 不符合指定刪除 ID 的保留
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    }
    case UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          // 不符合 ID 的保留
          if (todo.id !== Number(action.payload.id)) return todo;
          // 符合指定 ID 的更新 content
          return {
            ...todo,
            content: action.payload.content,
          };
        }),
      };
    }
    default: {
      return state;
    }
  }
}
