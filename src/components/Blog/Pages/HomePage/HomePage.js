import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { getPosts } from '../../WebAPI'

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0,2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`
const PostTitle = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 24px;
`
const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  )
}

export default function HomePage() {
  const [posts, setPosts] = useState(null);

  // component mount 時執行(初始化)
  useEffect(() => {
    getPosts().then(posts => setPosts(posts))
  }, [])
  return (
    <Root>
      {posts && posts.map(post => <Post key={post.id} post={post}></Post>)}
    </Root>
  );
}

Post.propTypes = {
  id: PropTypes.number,
  createdAt: PropTypes.string,
  title: PropTypes.string,
}

HomePage.propTypes = {
  id: PropTypes.number,
  createdAt: PropTypes.string,
  title: PropTypes.string,
}

