import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { getSinglePost } from "../../WebAPI";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  padding: 16px;
`;
const PostTitle = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
`;
const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.5);
  text-align: end;
`;
const PostBody = styled.div`
  margin: 16px auto;
  border: 1px solid black;
  padding: 16px;
  border-radius: 8px;
`;

function Post({ post }) {
  console.log("render post");
  return (
    <PostContainer>
      <PostTitle>{post[0].title}</PostTitle>
      <PostDate>{new Date(post[0].createdAt).toLocaleString()}</PostDate>
      <PostBody>{post[0].body}</PostBody>
    </PostContainer>
  );
}

export default function SinglePost() {
  // 取得在 Route 中設定的 URL 參數
  const { id } = useParams();
  const [post, setPost] = useState(null);
  // component mount 時執行(初始化)
  useEffect(() => {
    getSinglePost(id).then((post) => setPost(post));
  }, []);
  return <Root>{post && <Post post={post}></Post>}</Root>;
}

Post.propTypes = {
  id: PropTypes.number,
  createdAt: PropTypes.string,
  body: PropTypes.string,
  title: PropTypes.string,
};
