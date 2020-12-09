/* eslint-disable import/no-unresolved */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner as UpdatingLoader } from 'react-awesome-spinners';
import {
  getPost,
  setSinglePostData,
  updatePost,
  setUpdatePostResponse,
  selectIsGettingPost,
  selectSinglePostData,
  selectUpdatePostResponse,
  selectIsUpdatingPost,
} from '../../../redux/reducers/postReducer';
import { userData, selectUserData } from '../../../redux/reducers/userReducer';
import usePrevious from '../../../hooks/usePrevious';
import PostLoadingBackground from '../../Loaders/LoopCircleLoading';
import { setErrorMessage } from '../../../redux/reducers/errorMessageReducer';

const Wrapper = styled.div`
  background: white;
  opacity: 0.8;
  width: 80%;
  border-radius: 10px;
  margin: 20px auto;
  padding: 20px;
`;
const PostForm = styled.form``;
const PostTitle = styled.input`
  padding: 8px;
  font-size: 24px;
  font-weight: bold;
  margin: 10px auto;
  border: 1px solid black;
  border-radius: 8px;
  width: 50%;
`;
const PostBody = styled.textarea`
  padding: 8px;
  font-size: 16px;
  margin: 10px auto;
  border: 1px solid black;
  border-radius: 8px;
  width: 100%;
  resize: none;
`;
const ErrorMessage = styled.div`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: red;
`;
const AddPostErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  margin-top: 1rem;
`;

export default function AddPost() {
  // 取得在 Route 中設定的 URL 參數
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // 從 store 中取得 state
  const isGettingPost = useSelector(selectIsGettingPost);
  const singlePostData = useSelector(selectSinglePostData);
  const updatePostResponse = useSelector(selectUpdatePostResponse);
  const isUpdatingPost = useSelector(selectIsUpdatingPost);
  const prevIsUpdatingPost = usePrevious(isUpdatingPost);
  // 權限驗證
  const userData = useSelector(selectUserData);

  // input 放在 component state
  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: titleValue,
      body: bodyValue,
    };
    // 由 redux thunk 協助 call API
    dispatch(updatePost(id, data));
  };

  // 當 id 改變時就呼叫 redux thunk 協助 call API
  useEffect(() => {
    // 權限管理
    if (!userData) {
      return dispatch(setErrorMessage('您無權限操作，請先登入'))
    }
    dispatch(getPost('single', id));
    // clean up function when dependencies change and component unmount
    return () => {
      dispatch(setSinglePostData(null));
    };
  }, [dispatch, id, userData]);

  useEffect(() => {
    //  收到回傳文章時將資料放入
    if (singlePostData && singlePostData.length > 0) {
      setTitleValue(singlePostData[0].title);
      setBodyValue(singlePostData[0].body);
    }
  }, [singlePostData]);

  useEffect(() => {
    if (updatePostResponse && updatePostResponse.id) {
      // 藉由 isUpdatingPost 狀態前後的變化來確認是否"剛更新完"文章
      // 1. 發送 request 前，isUpdatingPost: false, prevIsUpdatingPost: false
      // 2. 開始發送 request, isUpdatingPost: true, prevIsUpdatingPost: false
      // 3. 收到 response, isUpdatingPost: false, prevIsUpdatingPost: true
      if (!isUpdatingPost && prevIsUpdatingPost) {
        history.push(`/BlogAppRedux/posts/${updatePostResponse.id}`);
      }
    }
  }, [
    dispatch,
    history,
    updatePostResponse,
    isUpdatingPost,
    prevIsUpdatingPost,
  ]);

  return (
    <>
      {isGettingPost && <PostLoadingBackground />}
      {userData && !isGettingPost && singlePostData && (
        <Wrapper>
          {singlePostData && singlePostData.length === 0 && (
            <ErrorMessage>編輯的文章不存在</ErrorMessage>
          )}
          {singlePostData && singlePostData.length > 0 && (
            <PostForm onSubmit={handleFormSubmit}>
              <div>
                <div>文章標題：</div>
                <PostTitle
                  value={titleValue}
                  onChange={(e) => {
                    setTitleValue(e.target.value);
                  }}
                  onFocus={() => {
                    setUpdatePostResponse(null);
                  }}
                />
              </div>
              <div>
                <div>文章內容：</div>
                <PostBody
                  rows={6}
                  value={bodyValue}
                  onChange={(e) => {
                    setBodyValue(e.target.value);
                  }}
                  onFocus={() => {
                    setUpdatePostResponse(null);
                  }}
                />
              </div>
              <div className="d-flex justify-content-center">
                {isUpdatingPost && <UpdatingLoader />}
                {!isUpdatingPost && (
                  <Button
                    variant="primary"
                    size="lg"
                    className=""
                    type="submit"
                  >
                    更新
                  </Button>
                )}
              </div>
              {updatePostResponse && updatePostResponse.ok === 0 && (
                <AddPostErrorMessage>
                  編輯文章失敗： {updatePostResponse.message}
                </AddPostErrorMessage>
              )}
            </PostForm>
          )}
        </Wrapper>
      )}
    </>
  );
}
