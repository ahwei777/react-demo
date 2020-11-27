/* eslint-disable import/no-unresolved */
import './App.css';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import SinglePost from './Pages/SinglePost';
import AddPost from './Pages/AddPost';
import AboutPage from './Pages/AboutPage';
import PaginationPage from './Pages/PaginationPage';
import { AuthContext } from './context';
import { getMe } from './WebAPI';
import { setAuthToken, getAuthToken } from './utils';

function BlogApp() {
  console.log('render BlogApp');
  // 登入狀態

  // user 預設值會先被 render 出來
  const [user, setUser] = useState(null);

  // 每次 mount 時先確認登入狀態，檢查 local storage 內有無 token，有的話再以 getMe 確認身分
  useEffect(() => {
    console.log('useEffect in first render');
    // 沒 token 直接 return
    if (!getAuthToken()) {
      setUser(false);
      return;
    }
    getMe().then((res) => {
      if (res.ok !== 1) {
        console.log('no ok');
        // 此 token 查詢帳號資料失敗：清掉 token 後顯示錯誤訊息
        setAuthToken('');
        setUser(false);
        return;
        // return setErrorMessage(res.message);
      }
      console.log('ok');
      setUser(res.data);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Header>header</Header>
        <Switch>
          <Route exact path="/BlogApp">
            <HomePage />
          </Route>
          <Route exact path="/BlogApp/about">
            <AboutPage />
          </Route>
          <Route exact path="/BlogApp/login">
            <LoginPage />
          </Route>
          <Route exact path="/BlogApp/register">
            <RegisterPage />
          </Route>
          <Route exact path="/BlogApp/pagination/:page">
            <PaginationPage />
          </Route>
          <Route exact path="/BlogApp/posts/:id">
            <SinglePost />
          </Route>
          <Route exact path="/BlogApp/new-post">
            <AddPost />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default BlogApp;
