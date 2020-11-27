import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

export const getPosts = () => fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then(res => res.json());

export const getPostsByPage = page => fetch(
  `${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=5`,
);

export const getSinglePost = id => fetch(`${BASE_URL}/posts?id=${id}`).then(res => res.json());

export const register = (nickname, username, password) => fetch(`${BASE_URL}/register`, {
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

export const login = (username, password) => fetch(`${BASE_URL}/login`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    username,
    password,
  }),
}).then(res => res.json());

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
};

export const addPost = (data) => {
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
