import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { addPost } from "../../WebAPI";

const Root = styled.div`
  width: 80%;
  margin: 32px auto;
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
  const [titleValue, setTitleValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
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
      history.push("/");
    });
  };

  return (
    <Root>
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
          ></PostTitle>
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
          ></PostBody>
        </div>
        <button>送出</button>
        {postError && (
          <PostErrorMessage>新增文章失敗：{postError}</PostErrorMessage>
        )}
      </PostForm>
    </Root>
  );
}

AddPost.propTypes = {
  body: PropTypes.string,
  title: PropTypes.string,
};
