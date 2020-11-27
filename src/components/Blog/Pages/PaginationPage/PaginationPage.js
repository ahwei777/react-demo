/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { getPostsByPage } from '../../WebAPI';
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

function PaginationWrapper({ postsCount, currentPage }) {
  const postsPerPage = 5;
  const totalPage = Math.ceil(postsCount / postsPerPage);
  console.log('totalPage: ', totalPage);
  const items = [];
  for (let number = 1; number <= totalPage; number += 1) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === Number(currentPage)}
        href={`#/BlogApp/pagination/${number}`}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination className="d-flex justify-content-center" size="lg">
      {items}
    </Pagination>
  );
}

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/BlogApp/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

function PaginationPage() {
  const { page } = useParams();
  const [posts, setPosts] = useState(null);
  const [postsCount, setPostsCount] = useState(null);

  // component mount 時執行(初始化)
  useEffect(() => {
    console.log('useEffect just init to setPosts');
    getPostsByPage(page)
      .then((res) => {
        // 從 response 的 header 拿到目前所有文章數量
        const count = Number(res.headers.get('x-total-count'));
        setPostsCount(count);
        return res.json();
      })
      .then(newPosts => setPosts(newPosts));
  }, [page]);

  return (
    <Wrapper>
      {postsCount > 0
        && posts
        && posts.map(post => <Post key={post.id} post={post} />)}
      {/* 當非同步的 fetch 回來後 postsCount 的狀態從原本的 null 被更新，此時才會開始 render PaginationWrapper */}
      {postsCount > 0 && (
        <PaginationWrapper postsCount={postsCount} currentPage={page} />
      )}
    </Wrapper>
  );
}

export default memo(PaginationPage);
