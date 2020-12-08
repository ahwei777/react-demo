/* eslint-disable import/no-unresolved */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import errorMessageReducer from './reducers/errorMessageReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    error: errorMessageReducer,
  },
});
