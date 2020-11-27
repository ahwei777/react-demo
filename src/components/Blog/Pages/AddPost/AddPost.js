/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { addPost } from '../../WebAPI';

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
const PostErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  font-size: 24px;
  margin-top: 1rem;
`;

export default function AddPost() {
  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [postError, setPostError] = useState(null);

  const history = useHistory();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: titleValue,
      body: bodyValue,
    };
    addPost(data).then((res) => {
      if (res.ok === 0) {
        return setPostError(res.message);
      }
      return history.push('/BlogApp');
    });
  };

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
              setPostError(null);
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
              setPostError(null);
            }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="primary" size="lg" className="" type="submit">
            送出
          </Button>
        </div>
        {postError && (
          <PostErrorMessage>
            新增文章失敗：
            {' '}
            {postError}
          </PostErrorMessage>
        )}
      </PostForm>
    </Wrapper>
  );
}
