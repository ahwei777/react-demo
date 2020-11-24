import { getAuthToken } from "./utils"

const BASE_URL = 'https://student-json-api.lidemy.me';

export const getPosts = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`)
    .then((res) => res.json());
}

export const getSinglePost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`)
    .then((res) => res.json());
}

export const register = () => {
  return fetch('https://student-json-api.lidemy.me/register', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    nickname: 'hello',
    username: 'hey',
    password: '1234'
  })
})
.then(res => res.json())
}

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
    })
  })
  .then(res => res.json())
}

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
}

export const addPost = (data) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
}