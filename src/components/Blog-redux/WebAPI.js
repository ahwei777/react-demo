import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

//  註冊
export const registerAPI = (nickname, username, password) => fetch(`${BASE_URL}/register`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    nickname,
    username,
    password,
  }),
}).then(res => res.json());

//  登入
export const loginAPI = (username, password) => fetch(`${BASE_URL}/login`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    username,
    password,
  }),
}).then(res => res.json());

//  註冊/登入後會拿到 token ，需再以 token 拿到目前使用者資料，也用於 session 確認
export const getMeAPI = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
};

//  拿全部文章
export const getAllPostsAPI = () => fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then(res => res.json());
//  拿分頁文章，先不轉換 json 格式因為還要從 header 取得所有文章數量
export const getPostsByPageAPI = page => fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=5`);
//  拿指定 ID 文章
export const getSinglePostAPI = id => fetch(`${BASE_URL}/posts?id=${id}`).then(res => res.json());

//  新增文章
export const addPostAPI = (data) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
};

//  刪除文章
export const deletePostAPI = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
};

//  編輯文章
export const updatePostAPI = (id, data) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
};
