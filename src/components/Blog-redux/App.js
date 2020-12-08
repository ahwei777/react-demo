/* eslint-disable import/no-unresolved */
import './App.css';
import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserData } from './redux/reducers/userReducer';

import Header from './components/Header';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import SinglePostPage from './components/Pages/SinglePostPage';
import AddPostPage from './components/Pages/AddPostPage';
import AboutPage from './components/Pages/AboutPage';
import PaginationPage from './components/Pages/PaginationPage';
import UpdatePostPage from './components/Pages/UpdatePostPage';

function BlogAppRedux() {
  const dispatch = useDispatch();

  // 只在初次 render App 時確認身分
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <Router>
      <Header>header</Header>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/BlogAppRedux">
          <HomePage />
        </Route>
        <Route exact path="/BlogAppRedux/about">
          <AboutPage />
        </Route>
        <Route exact path="/BlogAppRedux/login">
          <LoginPage />
        </Route>
        <Route exact path="/BlogAppRedux/register">
          <RegisterPage />
        </Route>
        <Route exact path="/BlogAppRedux/pagination/:page">
          <PaginationPage />
        </Route>
        <Route exact path="/BlogAppRedux/posts/:id">
          <SinglePostPage />
        </Route>
        <Route exact path="/BlogAppRedux/new-post">
          <AddPostPage />
        </Route>
        <Route exact path="/BlogAppRedux/update-post/:id">
          <UpdatePostPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default BlogAppRedux;
