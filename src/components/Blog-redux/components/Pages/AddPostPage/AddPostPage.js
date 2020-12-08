/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPost,
  selectAddPostResponse,
  selectIsAddingPost,
} from '../../../redux/reducers/postReducer';
import { setErrorMessage } from '../../../redux/reducers/errorMessageReducer';
import usePrevious from '../../../hooks/usePrevious';

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
const AddPostErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  margin-top: 1rem;
`;

export default function AddPost() {
  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const history = useHistory();

  const dispatch = useDispatch();
  // 從 store 中取得 state
  const addPostResponse = useSelector(selectAddPostResponse);
  const isAddingPost = useSelector(selectIsAddingPost);
  const prevIsAddingPost = usePrevious(isAddingPost);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: titleValue,
      body: bodyValue,
    };
    dispatch(addPost(data));
  };

  useEffect(() => {
    //  藉由 isAddingPost 狀態前後的變化來確認是否剛新增完文章
    //  1. 發送 request 前，isAddingPost: false, prevIsAddingPost: false
    //  2. 開始發送 request, isAddingPost: true, prevIsAddingPost: false
    //  3. 收到 response, isAddingPost: false, prevIsAddingPost: true
    if (!isAddingPost && prevIsAddingPost) {
      history.push(`/BlogAppRedux/posts/${addPostResponse.id}`);
    }
  }, [dispatch, history, addPostResponse, isAddingPost, prevIsAddingPost]);

  return (
    <Wrapper>
      <PostForm onSubmit={handleFormSubmit}>
        <div>
          <div>文章標題：</div>
          <PostTitle
            value={titleValue}
            onChange={(e) => {
              setTitleValue(e.target.value);
            }}
            onFocus={() => {
              dispatch(setErrorMessage(null));
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
              dispatch(setErrorMessage(null));
            }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="primary" size="lg" className="" type="submit">
            送出
          </Button>
        </div>
        {addPostResponse && addPostResponse.ok === 0 && (
          <AddPostErrorMessage>{addPostResponse.message}</AddPostErrorMessage>
        )}
      </PostForm>
    </Wrapper>
  );
}
