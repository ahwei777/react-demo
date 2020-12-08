/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Default as RegisteringLoader } from 'react-awesome-spinners';
import { register, selectIsRegistering, selectUserData } from '../../../redux/reducers/userReducer';
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

export default function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  //  input 狀態存在 component 內
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 引入 store 內的 state
  const isRegistering = useSelector(selectIsRegistering);
  const userData = useSelector(selectUserData);

  //  點擊送出表單 call dispatch
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(nickname, username, password));
  };
  //  重新輸入時清掉錯誤訊息
  const handleInputFocus = () => {
    dispatch(setErrorMessage(null));
  };

  useEffect(() => {
    //  監聽 userData，當註冊成功後會更新 userData，再導至首頁
    if (userData) {
      history.push('/BlogAppRedux/');
    }
  }, [dispatch, userData, history]);

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
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={handleInputFocus}
            />
          </Col>
        </Form.Group>
        {/* 註冊 Loader */}
        {isRegistering && (
          <div className="d-flex justify-content-center">
            <RegisteringLoader />
          </div>
        )}
        {/* 註冊按鈕在 call API 期間隱藏 */}
        {!isRegistering && (
          <Button variant="primary" size="lg" className="" type="submit">
            註冊
          </Button>
        )}
      </Form>
    </Wrapper>
  );
}
