/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '../../WebAPI';

const Wrapper = styled.div`
  background: white;
  opacity: 0.8;
  width: 80%;
  border-radius: 10px;
  margin: 20px auto;
  padding: 20px;
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
  console.log('render post');
  return (
    <PostContainer>
      <PostTitle>{post[0].title}</PostTitle>
      <PostDate>{new Date(post[0].createdAt).toLocaleString()}</PostDate>
      <PostBody>{post[0].body}</PostBody>
    </PostContainer>
  );
}

export default function SinglePost() {
  console.log('render single post');
  // 取得在 Route 中設定的 URL 參數
  const { id } = useParams();
  const [post, setPost] = useState(null);
  // component mount 時執行(初始化)
  useEffect(() => {
    getSinglePost(id).then(newPosts => setPost(newPosts));
  }, []);
  return <Wrapper>{post && <Post post={post} />}</Wrapper>;
}
