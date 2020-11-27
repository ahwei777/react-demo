/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context';
import { setAuthToken } from '../utils';

import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from '../../../constants/breakpoint';

const HeaderContainer = styled.div`
  text-align: center;
  background: floralwhite;
  display: flex;
  position: sticky;
  z-index: 1;
  top: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  ${MEDIA_QUERY_MOBILE_M} {
    flex-direction: column;
  }
  ${MEDIA_QUERY_MOBILE_L} {
    flex-direction: row;
    padding: 10px;
  }
`;
const Brand = styled.div`
  font-weight: bold;
  margin: 10px auto;
  ${MEDIA_QUERY_MOBILE_M} {
    font-size: 50px;
  }
  ${MEDIA_QUERY_MOBILE_L} {
    width: 150px;
    font-size: 24px;
    margin: auto 10px;
  }
  ${MEDIA_QUERY_TABLET} {
    width: 350px;
    font-size: 40px;
  }
`;
const NavbarListContainer = styled.div`
  ${MEDIA_QUERY_MOBILE_M} {
    width: 100%;
    & + & {
      margin-top: 6px;
    }
  }
  ${MEDIA_QUERY_MOBILE_L} {
    margin: auto 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
const NavbarList = styled.div`
  display: flex;
  ${MEDIA_QUERY_MOBILE_M} {
    font-size: 24px;
    flex-direction: column;
    align-items: center;
    & + & {
      margin-top: 6px;
    }
  }
  ${MEDIA_QUERY_MOBILE_L} {
    font-size: 18px;
    flex-direction: row;
    & + & {
      margin-top: 0px;
    }
  }
`;
const Nav = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  color: black;
  text-decoration: none;
  ${props => props.$active
    && `
    background: rgba(0, 0, 0, 0.1);
  `}
  ${MEDIA_QUERY_MOBILE_M} {
    width: 100%;
    & + & {
      margin-top: 6px;
    }
  }
  ${MEDIA_QUERY_MOBILE_L} {
    padding: 5px 10px;
    width: auto;
    & + & {
      margin-top: 0px;
      margin-left: 6px;
    }
  }
  ${MEDIA_QUERY_TABLET} {
    font-size: 24px;
  }
`;

export default function Header() {
  console.log('render header');
  const { pathname } = useLocation();
  console.log('pathname', pathname);
  // 取得當下 user 的狀態(未登入:null, 已登入：帳號資料物件)
  const { user, setUser } = useContext(AuthContext);
  console.log('now user is', user);

  const handleLogout = () => {
    // 登出：清空 Token 並導回首頁
    setAuthToken('');
    setUser(false);
    // 父層 user state 改變，重新 re-render
    console.log('pathname', pathname);
  };
  return (
    <HeaderContainer>
      <Brand>My Blog</Brand>
      <NavbarListContainer>
        <NavbarList>
          <Nav $active={pathname === '/BlogApp'} to="/BlogApp">
            首頁
          </Nav>
          <Nav $active={pathname === '/BlogApp/About'} to="/BlogApp/About">
            關於我
          </Nav>
          <Nav
            $active={pathname.includes('/BlogApp/pagination')}
            to="/BlogApp/pagination/1"
          >
            文章分頁
          </Nav>
          {user && (
            <Nav
              $active={pathname === '/BlogApp/new-post'}
              to="/BlogApp/new-post"
            >
              發布文章
            </Nav>
          )}
        </NavbarList>
        <NavbarList>
          {/* 初始化會先依據 user 的初始值顯示，等 call API 後才會改變 */}
          {user === false && (
            <>
              <Nav
                $active={pathname === '/BlogApp/register'}
                to="/BlogApp/register"
              >
                註冊
              </Nav>
              <Nav $active={pathname === '/BlogApp/login'} to="/BlogApp/login">
                登入
              </Nav>
            </>
          )}
          {user && (
            <Nav onClick={handleLogout} to="/BlogApp">
              登出
            </Nav>
          )}
        </NavbarList>
      </NavbarListContainer>
    </HeaderContainer>
  );
}
