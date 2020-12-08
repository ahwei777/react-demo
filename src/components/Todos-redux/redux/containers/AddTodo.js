import { connect } from 'react-redux';
import { addTodo } from '../actions';
// 要包裝的原 component
import AddTodo from '../../components/AddTodo';

// 提取 store 內想要的 state，類似 hook 版本的 useSelector
const mapStateToProps = (store) => {
  return {
    todos: store.todoState.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (payload) => dispatch(addTodo(payload)),
    // 如果 props 名稱等於 action 名稱可省略直接回傳 addTodo
  };
};
// const mapDispatchToProps = { addTodo }

// Higher Order Component: 將原 component 與 redux 串接起來，因為是實際與 redux 互動串聯的元件，故也被稱作 smart component, container

//  const connectToStore = connect(mapStateToProps, mapDispatchToProps);
//  const ConnectedAddTodo = connectToStore(AddTodo);
//  export default ConnectedAddTodo;
//  可縮寫為
export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
