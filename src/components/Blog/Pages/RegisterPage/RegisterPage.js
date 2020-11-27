/* eslint-disable import/no-unresolved */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import { getMe, register } from '../../WebAPI';
import { setAuthToken } from '../../utils';
import { AuthContext } from '../../context';

const Wrapper = styled.div`
  text-align: center;
  margin: 100px auto;
  background: white;
  opacity: 0.8;
  max-width: 500px;
  border-radius: 10px;
  padding: 50px 20px;
`;
const ErrorMessage = styled.div`
  color: red;
`;

export default function RegisterPage() {
  console.log('render RegisterPage');
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  // 取出上層 contextProvider 提供的 context
  const { setUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(nickname, username, password).then((res) => {
      if (res.ok === 0) {
        return setErrorMessage(res.message);
      }
      // 註冊成功將回傳的 token 儲存在 localStorage
      setAuthToken(res.token);
      // 取得該使用者資料
      getMe().then((resp) => {
        if (resp.ok !== 1) {
          // 此 token 查詢帳號資料失敗：清掉 token 後顯示錯誤訊息
          setAuthToken(null);
          return setErrorMessage(resp.message);
        }
        // 查詢資料成功，將回傳的帳號資料(物件)存入 user
        setUser(resp.data);
        return history.push('/BlogApp');
      });
      return true;
    });
  };
  const handleInputFocus = () => {
    setErrorMessage(null);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicNickname" as={Row}>
          <Form.Label column sm="4">
            Nickname
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="nickname"
              placeholder="Enter nickname"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              onFocus={handleInputFocus}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="formBasicUsername" as={Row}>
          <Form.Label column sm="4">
            Username
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onFocus={handleInputFocus}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" as={Row}>
          <Form.Label column sm="4">
            Password
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={handleInputFocus}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" size="lg" className="" type="submit">
          註冊
        </Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </Wrapper>
  );
}
