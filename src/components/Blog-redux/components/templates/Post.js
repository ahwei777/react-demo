/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_TABLET,
} from '../../../../constants/breakpoint';

const PostContainer = styled(Link)`
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
  &:hover {
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const PostTitle = styled.div`
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
    <PostContainer to={`/BlogAppRedux/posts/${post.id}`}>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

export default memo(Post);
