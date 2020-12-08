/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, {
  useEffect, useState, memo, useCallback,
} from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner as DeletingLoader } from 'react-awesome-spinners';
import Wrapper from '../../templates/Wrapper';
import usePrevious from '../../../hooks/usePrevious';
import {
  getPost,
  setSinglePostData,
  deletePost,
  selectIsGettingPost,
  selectIsDeletingPost,
  selectSinglePostData,
} from '../../../redux/reducers/postReducer';
import { selectUserData } from '../../../redux/reducers/userReducer'
import PostLoadingBackground from '../../Loaders/LoopCircleLoading';

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
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 64px;
`;

function DeleteModal({
  showDeleteModal,
  handleCloseDeleteModal,
  handleDeletePost,
  isDeletingPost,
}) {
  return (
    <>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>提示</Modal.Title>
        </Modal.Header>
        {isDeletingPost && (
          <div className="d-flex justify-content-center">
            <DeletingLoader />
          </div>
        )}
        {!isDeletingPost && (
          <>
            <Modal.Body>確定刪除此篇文章嗎?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                取消
              </Button>
              <Button variant="danger" onClick={handleDeletePost}>
                確定
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}

const Post = memo(({
  singlePostData, handleShowDeleteModal, userData, id,
}) => {
  return (
    <PostContainer>
      <PostTitle>{singlePostData[0].title}</PostTitle>
      <PostDate>
        {new Date(singlePostData[0].createdAt).toLocaleString()}
      </PostDate>
      {/* 權限驗證：登入者的 ID 為此篇文章作者的 ID 時才可編輯及刪除 */}
      {userData && userData.id === singlePostData[0].userId && (
        <ButtonWrapper>
          <Button
            className="mr-3"
            variant="info"
            href={`#/BlogAppRedux/update-post/${id}`}
          >
            編輯
          </Button>
          <Button variant="danger" onClick={handleShowDeleteModal}>
            刪除
          </Button>
        </ButtonWrapper>
      )}
      <PostBody>{singlePostData[0].body}</PostBody>
    </PostContainer>
  );
});

export default function SinglePost() {
  //  取得在 Route 中設定的 URL 參數
  const { id } = useParams();
  const history = useHistory();

  // 引入 redux function 及 store
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const isGettingPost = useSelector(selectIsGettingPost);
  const singlePostData = useSelector(selectSinglePostData);
  const isDeletingPost = useSelector(selectIsDeletingPost);
  const prevIsDeletingPost = usePrevious(isDeletingPost);
  const handleDeletePost = () => {
    dispatch(deletePost(id));
  };

  //  刪除確認視窗
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = useCallback(() => {
    setShowDeleteModal(true);
  }, [setShowDeleteModal]);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  // 當 id 改變時就呼叫 redux thunk 協助 call API
  useEffect(() => {
    dispatch(getPost('single', id));
    return () => {
      // clean up
      dispatch(setSinglePostData(null));
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!isDeletingPost && prevIsDeletingPost) {
      //  藉由 isDeletingPost 狀態前後的變化來確認是否"剛刪除"文章
      //  1. 發送 request 前，isDeletingPost: false, prevIsDeletingPost: false
      //  2. 開始發送 request, isDeletingPost: true, prevIsDeletingPost: false
      //  3. 收到 response, isDeletingPost: false, prevIsDeletingPost: true
      history.push('/BlogAppRedux/');
    }
  }, [history, isDeletingPost, prevIsDeletingPost]);

  return (
    <>
      {isGettingPost && <PostLoadingBackground />}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDeletePost={handleDeletePost}
        isDeletingPost={isDeletingPost}
      />
      {!isGettingPost && singlePostData && singlePostData.length > 0 && (
        <Wrapper>
          <Post
            singlePostData={singlePostData}
            handleShowDeleteModal={handleShowDeleteModal}
            isDeletingPost={isDeletingPost}
            userData={userData}
            id={id}
          />
        </Wrapper>
      )}
    </>
  );
}
