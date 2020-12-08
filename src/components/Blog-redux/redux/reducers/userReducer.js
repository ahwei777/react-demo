/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';
import { registerAPI, loginAPI, getMeAPI } from '../../WebAPI';
import { setAuthToken, getAuthToken } from '../../utils';
import { setErrorMessage } from './errorMessageReducer';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,

    isLogging: false,
    logResponse: null,

    isRegistering: false,
    registerResponse: null,

    // 初始值設為 null 避免 render header 時因為還在確認使用者身分而跳字
    isGettingUserData: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setIsLogging: (state, action) => {
      state.isLogging = action.payload;
    },
    setLogResponse: (state, action) => {
      state.logResponse = action.payload;
    },
    setIsRegistering: (state, action) => {
      state.isRegistering = action.payload;
    },
    setRegisterResponse: (state, action) => {
      state.registerResponse = action.payload;
    },
    setIsGettingUserData: (state, action) => {
      state.isGettingUserData = action.payload;
    },
    setGetUserDataResponse: (state, action) => {
      state.getUserDataResponse = action.payload;
    },
  },
});

// 設定 action
export const {
  setUser,
  setIsLogging,
  setLogResponse,
  setIsRegistering,
  setRegisterResponse,
  setIsGettingUserData,
  setGetUserDataResponse,
} = userSlice.actions;

// 定義 redux thunk function
export const login = (username, password) => (dispatch) => {
  // 發送中
  dispatch(setIsLogging(true));
  loginAPI(username, password)
    .then((json) => {
      //  登入失敗
      if (json.ok === 0) {
        dispatch(setErrorMessage(json.message));
        dispatch(setIsLogging(false));
        return;
      }
      //  登入成功將回傳的 token 儲存在 localStorage
      setAuthToken(json.token);
      //  取得該使用者資料
      getMeAPI().then((resJson) => {
        //  此 token 查詢帳號資料失敗：清掉 token 後顯示錯誤訊息
        if (resJson.ok === 0) {
          setAuthToken('');
          dispatch(setUser(null));
          dispatch(setErrorMessage(resJson.message));
          dispatch(setIsLogging(false));
          return;
        }
        // 成功登入，設置 user
        dispatch(setUser(resJson.data));
        //  發送完畢
        dispatch(setIsLogging(false));
      });
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

export const register = (nickname, username, password) => (dispatch) => {
  // 發送中
  dispatch(setIsRegistering(true));
  registerAPI(nickname, username, password)
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setIsRegistering(false));
        dispatch(setErrorMessage(json.message));
        return;
      }
      //  註冊成功將回傳的 token 儲存在 localStorage
      setAuthToken(json.token);
      //  取得該使用者資料
      getMeAPI().then((resJson) => {
        if (resJson.ok === 0) {
          //  此 token 查詢帳號資料失敗：清掉 token 後顯示錯誤訊息
          setAuthToken('');
          dispatch(setUser(null));
          dispatch(setIsRegistering(false));
          dispatch(setErrorMessage(resJson.message));
          return;
        }
        dispatch(setUser(resJson.data));
        //  發送完畢
        dispatch(setIsRegistering(false));
      });
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

export const getUserData = () => (dispatch) => {
  // 沒 token 直接 return
  if (!getAuthToken()) {
    dispatch(setUser(null));
    dispatch(setIsGettingUserData(false));
    return;
  }
  // 發送中
  dispatch(setIsGettingUserData(true));
  getMeAPI()
    .then((json) => {
      if (json.ok !== 1) {
        // 此 token 查詢帳號資料失敗：清掉 token 後顯示錯誤訊息
        setAuthToken('');
        dispatch(setUser(null));
        dispatch(setGetUserDataResponse(json.message));
        dispatch(setIsGettingUserData(false));
        return;
      }
      dispatch(setUser(json.data));
      // 發送完畢
      dispatch(setIsGettingUserData(false));
    })
    .catch((err) => {
      console.log('err: ', err);
      dispatch(setIsGettingUserData(false));
    });
};

// selector
export const selectCount = state => state.counter.value;

export default userSlice.reducer;
