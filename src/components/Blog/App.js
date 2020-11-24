import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Header from './Header'
import HomePage from './Pages/HomePage'
import SinglePost from './Pages/SinglePost'
import LoginPage from './Pages/LoginPage'
import AddPost from './Pages/AddPost'

import { AuthContext } from "./context";
import { getMe } from "./WebAPI";
import { setAuthToken, getAuthToken } from "./utils";
const Root = styled.div`
`;

function App() {
  // 登入狀態
  let nowUser = {};
  // 每次 mount 時先確認登入狀態
  useEffect(() => {
    // 先檢查 local storage 內有無 token ，有的話再以 getMe 確認身分
    if (getAuthToken) {
      getMe().then((res) => {
        if (res.ok !== 1) {
          // 此 token 查詢帳號資料失敗：清掉 token 後顯示錯誤訊息
          setAuthToken(null);
          //return setErrorMessage(res.message);
        }
        nowUser = res.data;
      })
    }
  }, [])
  
  const [user, setUser] = useState(nowUser);

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      <Root>
        <Router>
          <Header>
            header
          </Header>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/posts/:id">
              <SinglePost />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/new-post">
              <AddPost />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
