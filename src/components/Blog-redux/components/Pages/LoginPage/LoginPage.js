/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Default as LoggingLoader } from 'react-awesome-spinners';
import { login, selectUserData, selectIsLogging } from '../../../redux/reducers/userReducer';
import { setErrorMessage } from '../../../redux/reducers/errorMessageReducer';

const Wrapper = styled.div`
  text-align: center;
  margin: 100px auto;
  background: white;
  opacity: 0.8;
  max-width: 500px;
  border-radius: 10px;
  padding: 50px 20px;
`;

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  //  input state 直接存在 component 內
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 引入 store 內的 state
  const isLogging = useSelector(selectIsLogging);
  const userData = useSelector(selectUserData);

  //  點擊送出表單 call dispatch
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  //  重新輸入時清掉錯誤訊息
  const handleInputFocus = () => {
    dispatch(setErrorMessage(null));
  };

  useEffect(() => {
    //  監聽 userData，當登入成功後會被更新，再導至首頁
    if (userData) {
      history.push('/BlogAppRedux/');
    }
  }, [userData, history]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
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
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={handleInputFocus}
            />
          </Col>
        </Form.Group>
        {isLogging && (
          <div className="d-flex justify-content-center">
            <LoggingLoader />
          </div>
        )}
        {!isLogging && (
          <Button variant="primary" size="lg" className="" type="submit">
            登入
          </Button>
        )}
      </Form>
    </Wrapper>
  );
}
