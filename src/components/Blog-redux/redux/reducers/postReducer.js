/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';
import {
  getSinglePostAPI,
  getAllPostsAPI,
  getPostsByPageAPI,
  addPostAPI,
  deletePostAPI,
  updatePostAPI,
} from '../../WebAPI';
import { setErrorMessage } from './errorMessageReducer';

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    isGettingPost: false,
    //  post
    singlePostData: null,
    allPostData: null,
    byPagePostData: null,
    totalPostsCount: null,

    isAddingPost: false,
    addPostResponse: null,

    isDeletingPost: false,

    isUpdatingPost: null,
    updatePostResponse: null,
  },
  reducers: {
    setIsGettingPost: (state, action) => {
      // 參數為單一值非物件
      state.isGettingPost = action.payload;
    },
    setSinglePostData: (state, action) => {
      state.singlePostData = action.payload;
    },
    setAllPostData: (state, action) => {
      state.allPostData = action.payload;
    },
    setByPagePostData: (state, action) => {
      state.byPagePostData = action.payload;
    },
    setTotalPostsCount: (state, action) => {
      state.totalPostsCount = action.payload;
    },
    setIsAddingPost: (state, action) => {
      state.isAddingPost = action.payload;
    },
    setAddPostResponse: (state, action) => {
      state.addPostResponse = action.payload;
    },
    setIsDeletingPost: (state, action) => {
      state.isDeletingPost = action.payload;
    },
    setIsUpdatingPost: (state, action) => {
      state.isUpdatingPost = action.payload;
    },
    setUpdatePostResponse: (state, action) => {
      state.updatePostResponse = action.payload;
    },
  },
});

// 設定 action
export const {
  setIsGettingPost,
  setSinglePostData,
  setAllPostData,
  setByPagePostData,
  setTotalPostsCount,
  setIsAddingPost,
  setAddPostResponse,
  setIsDeletingPost,
  setIsUpdatingPost,
  setUpdatePostResponse,
} = postSlice.actions;

// 定義 redux thunk function
export const getPost = (type, params) => (dispatch) => {
  switch (type) {
    case 'single':
      // params: id
      dispatch(setIsGettingPost(true));
      getSinglePostAPI(params)
        .then((json) => {
          if (json.length === 0) {
            dispatch(setErrorMessage('此文章不存在或已被刪除'));
            dispatch(setIsGettingPost(false));
            return;
          }
          // 收到結果
          dispatch(setSinglePostData(json));
          dispatch(setIsGettingPost(false));
        })
        .catch((err) => {
          console.log('err: ', err);
        });
      break;
    case 'all':
      // params: id
      dispatch(setIsGettingPost(true));
      getAllPostsAPI()
        .then((json) => {
          if (json.length === 0) {
            dispatch(setErrorMessage('目前無任何文章'));
            dispatch(setIsGettingPost(false));
            return;
          }
          // 收到結果
          dispatch(setAllPostData(json));
          dispatch(setIsGettingPost(false));
        })
        .catch((err) => {
          console.log('err: ', err);
        });
      break;
    case 'byPage':
      // params: page
      dispatch(setIsGettingPost(true));
      getPostsByPageAPI(params)
        .then((res) => {
          // 從 response 的 header 拿到目前所有文章數量
          const count = Number(res.headers.get('x-total-count'));
          dispatch(setTotalPostsCount(count));
          // 利用 chaining 特性讓下個 .then 保證拿到已轉化成 json 格式的 response
          return res.json();
        })
        .then((json) => {
          if (json.length === 0) {
            dispatch(setErrorMessage('查看的分頁不存在'));
            dispatch(setIsGettingPost(false));
            return;
          }
          // 收到結果
          dispatch(setByPagePostData(json));
          dispatch(setIsGettingPost(false));
        })
        .catch((err) => {
          console.log('err: ', err);
        });
      break;
    default:
      return false;
  }
  return true;
};

export const addPost = (data) => (dispatch) => {
  // 新增中
  dispatch(setIsAddingPost(true));
  addPostAPI(data)
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setErrorMessage(json.message));
        return;
      }
      // 新增完畢
      dispatch(setAddPostResponse(json));
      dispatch(setIsAddingPost(false));
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

export const deletePost = (id) => (dispatch) => {
  // 刪除中
  dispatch(setIsDeletingPost(true));
  deletePostAPI(id)
    .then(() => {
      // 刪除完畢
      dispatch(setIsDeletingPost(false));
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

export const updatePost = (id, data) => (dispatch) => {
  // 發送中
  dispatch(setIsUpdatingPost(true));
  updatePostAPI(id, data)
    .then((json) => {
      dispatch(setUpdatePostResponse(json));
      // 發送完畢
      dispatch(setIsUpdatingPost(false));
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

// selector
export const selectAddPostResponse = (store) => store.posts.addPostResponse;
export const selectIsGettingPost = (store) => store.posts.isGettingPost;
export const selectIsAddingPost = (store) => store.posts.isAddingPost;
export const selectIsDeletingPost = (store) => store.posts.isDeletingPost;
export const selectAllPostData = (store) => store.posts.allPostData;
export const selectByPagePostData = (store) => store.posts.byPagePostData;
export const selectSinglePostData = (store) => store.posts.singlePostData;
export const selectTotalPostCount = (store) => store.posts.totalPostsCount;
export const selectIsUpdatingPost = (store) => store.posts.isUpdatingPost;
export const selectUpdatePostResponse = (store) =>
  store.posts.updatePostResponse;

export default postSlice.reducer;
