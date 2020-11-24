import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { login, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../context";

const ErrorMessage = styled.div`
  color: red;
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  // 取出上層 contextProvider 提供的 context
  const { setUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password).then((res) => {
      if (res.ok === 0) {
        return setErrorMessage(res.message);
      }
      // 登入成功將回傳的 token 儲存在 localStorage
      setAuthToken(res.token);
      // 取得該使用者資料
      getMe().then(res => {
        if (res.ok !== 1) {
          // 此 token 查詢帳號資料失敗：清掉 token 後顯示錯誤訊息
          setAuthToken(null);
          return setErrorMessage(res.message);
        }
        // 查詢資料成功，將回傳的帳號資料(物件)存入 user
        setUser(res.data)
        history.push("/");
      })
      
    });
  };
  const handleInputFocus = () => {
    setErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:{" "}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={handleInputFocus}
        />
      </div>
      <div>
        password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={handleInputFocus}
        />
      </div>
      <button>登入</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
