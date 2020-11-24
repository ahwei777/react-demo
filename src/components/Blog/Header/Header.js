import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import { AuthContext } from "../context";
import { setAuthToken } from "../utils";

const HeaderContainer = styled.div`
  background: white;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 32px;
`;

const Brand = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const NavbarList = styled.div`
  display: flex;
  aligin-items: center;
  height: 64px;
`;

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  ${(props) =>
    props.$active &&
    `
    background: rgba(0, 0, 0, 0.1);
  `}
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  ${NavbarList} {
    margin-left: 32px;
  }
`;

export default function Header() {
  const { pathname } = useLocation();
  // 取得當下 user 的狀態(未登入:null, 已登入：帳號資料物件)
  const { user, setUser, finishedCheckingUser } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    // 登出：清空 Token 並導回首頁
    setAuthToken("");
    setUser(null);
    if (pathname !== "/") {
      history.push('/')
    }
  };
  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>我的 React 部落格</Brand>
        <NavbarList>
          <Nav $active={pathname === "/"} to="/">
            首頁
          </Nav>
          {user && (
            <Nav $active={pathname === "/new-post"} to="/new-post">
              發布文章
            </Nav>
          )}
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {!user  && (
          <Nav $active={pathname === "/login"} to="/login">
            登入
          </Nav>
        )}
        {user && <Nav onClick={handleLogout} to="">登出</Nav>}
      </NavbarList>
    </HeaderContainer>
  );
}
