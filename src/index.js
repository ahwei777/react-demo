// 引入 bootstrap 的 CSS
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
// 引入主題(可設定類似 mixin 的全域變數供使用
import { ThemeProvider } from "styled-components";

//import BlogApp from './components/Blog/App';
//import BoardApp from './components/Board/App'

// week21
import TodosApp from "./components/Todos/App";
import GobangApp from "./components/Gobang/App";
import FormApp from "./components/Form/App";

// 設定常用/指定屬性
const theme = {
  colors: {
    primary_300: "#ff7979",
    primary_400: "#e33e3e",
    primary_500: `#af0505`,
  },
};

// <React.StrictMode> 嚴格模式可能會造成偵錯問題，可先取消
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/TodosApp">
          <TodosApp />
        </Route>
        <Route exact path="/GobangApp">
          <GobangApp />
        </Route>
        <Route exact path="/FormApp">
          <FormApp />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
