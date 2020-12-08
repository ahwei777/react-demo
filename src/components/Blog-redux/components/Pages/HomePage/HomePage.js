/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, setAllPostData } from '../../../redux/reducers/postReducer';
import Wrapper from '../../templates/Wrapper';
import Post from '../../templates/Post';
import PostLoadingBackground from '../../Loaders/LoopCircleLoading';

function HomePage() {
  const dispatch = useDispatch();
  const isGettingPost = useSelector(store => store.posts.isGettingPost);
  const allPostData = useSelector(store => store.posts.allPostData);

  // component mount 時執行(初始化)
  useEffect(() => {
    dispatch(getPost('all'));
    // unmount 時先 clean up 避免下次回來時因為仍有舊資料而短暫顯示
    return () => {
      dispatch(setAllPostData(null));
    };
  }, [dispatch]);

  return (
    <>
      {isGettingPost && <PostLoadingBackground />}
      {!isGettingPost && allPostData && allPostData.length > 0 && (
        <Wrapper>
          {allPostData.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </Wrapper>
      )}
    </>
  );
}

export default memo(HomePage);
