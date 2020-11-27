/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getPosts } from '../../WebAPI';
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_TABLET,
} from '../../../../constants/breakpoint';

const Wrapper = styled.div`
  background: white;
  opacity: 0.8;
  width: 80%;
  border-radius: 10px;
  margin: 20px auto;
  padding: 10px;
`;
const PostContainer = styled.div`
  border: solid 2px sandybrown;
  border-radius: 8px;
  border-bottom: 1px solid rgba(0, 12, 34, 0, 2);
  padding: 16px;
  display: flex;
  justify-content: space-between;
  ${MEDIA_QUERY_MOBILE_M} {
    margin: 10px auto;
    flex-direction: column;
  }
  ${MEDIA_QUERY_TABLET} {
    flex-direction: row;
  }
`;
const PostTitle = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 24px;
  max-width: 360px;
  overflow-wrap: break-word;
`;
const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
  text-align: right;
  ${MEDIA_QUERY_MOBILE_M} {
    margin-top: 16px;
  }
  ${MEDIA_QUERY_TABLET} {
    margin-top: 0px;
  }
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/BlogApp/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

function HomePage() {
  console.log('render HomePage');
  const [posts, setPosts] = useState(null);
  // component mount 時執行(初始化)
  useEffect(() => {
    console.log('useEffect just init to setPosts');
    getPosts().then(newPosts => setPosts(newPosts));
  }, []);

  return (
    <Wrapper>
      {posts && posts.map(post => <Post key={post.id} post={post} />)}
    </Wrapper>
  );
}

export default memo(HomePage);
