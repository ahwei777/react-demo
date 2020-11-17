import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import AppPropTypes from './App(propTypes)'
//import Counter from './Counter';
//import PropDrilling from './PropDrilling';
import reportWebVitals from './reportWebVitals';

// 引入主題(可設定類似 mixin 的全域變數供使用
import { ThemeProvider } from 'styled-components';

// 設定常用/指定屬性
const theme = {
  colors: {
    primary_300: '#ff7979',
    primary_400: '#e33e3e',
    primary_500: `#af0505`,
  }
}

// <React.StrictMode> 嚴格模式可能會造成偵錯問題，可先取消

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AppPropTypes />
  </ThemeProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
