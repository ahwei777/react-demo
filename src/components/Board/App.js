import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const API_ENDPOINT =
  "https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc";

const Page = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
`;

const MessageForm = styled.form`
  margin-top: 16px;
`;

const MessageTextArea = styled.textarea`
  display: block;
  width: 100%;
`;
const SubmitButton = styled.button`
  margin-top: 8px;
`;
const MessageList = styled.div`
  margin-top: 16px;
`;
const MessageContainer = styled.div`
  border: 1px solid black;
  padding: 8px 16px;
  border-radius: 8px;
  & + & {
    margin-top: 16px;
  }
`;
const MessageHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
const MessageAuthor = styled.div`
  color: rgba(23, 78 , 55, 0.3)
  font-size: 14px;
`;
const MessageTime = styled.div``;
const MessageBody = styled.div`
  font-size: 16px;
  margin-top: 16px;
`;
const ErrorMessage = styled.div`
  margin-top: 16px;
  color: red;
`;
const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: darkslategrey;
`

function Message({ author, time, children }) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageBody>{children}</MessageBody>
    </MessageContainer>
  );
}

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node,
};

function App() {
  console.log('render app')
  const [messages, setMessages] = useState(null);
  const [apiMessageError, setMessageApiError] = useState(null);
  const [textareaValue, setTextareaValue] = useState();
  const [postMessageError, setPostMessageError] = useState(null);
  // 避免多次送出留言，設定間隔
  const [isLoadingPostMessage, setLoadingPostMessage] = useState(false)

  const fetchMessages = () => {
    console.log('start fetch!')
    return (
      fetch(API_ENDPOINT)
        // 轉為 json 格式
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
        })
        .catch((err) => {
          setMessageApiError(err.message);
        })
    );
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleTextareaFocus = () => {
    setPostMessageError(null)
  }

  const handleFormSubmit = (e) => {
    // 先阻止表單發送行為
    e.preventDefault();
    // 如果還在送出的冷卻時間內就取消
    if (isLoadingPostMessage) {
      return
    }
    // 正要發送，進入冷卻
    setLoadingPostMessage(true)
    fetch("https://student-json-api.lidemy.me/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "hello",
        body: textareaValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // 收到回傳結果，重置送出留言的冷卻
        setLoadingPostMessage(false)
        // 針對後端回覆錯誤處理
        if (data.ok === 0) {
          setPostMessageError(data.message);
          return;
        }
        // 成功新增留言，清空輸入框
        setTextareaValue('')
        fetchMessages();
      })
      // 捕捉 fetch 失敗的錯誤
      .catch((err) => {
        setLoadingPostMessage(false)
        setPostMessageError(err.message);
      });
  };
  // 在 render 結束後 call API，並且第二個參數傳空值表示只在此 component mount 時執行
  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <Page>
      {isLoadingPostMessage && <Loading>Loading...</Loading>}
      <Title>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextArea
          rows={10}
          value={textareaValue}
          onChange={handleTextareaChange}
          onFocus={handleTextareaFocus}
        />
        <SubmitButton>送出留言</SubmitButton>
        {postMessageError && (
          <ErrorMessage>
            新增留言失敗: {postMessageError}
          </ErrorMessage>
        )}
      </MessageForm>
      {apiMessageError && (
        <ErrorMessage>
          Something went wrong: {apiMessageError.toString()}
        </ErrorMessage>
      )}
      {messages && messages.length === 0 && <div>No Message yet!</div>}
      <MessageList>
        {messages &&
          messages.map((message) => (
            <Message
              key={message.id}
              author={message.nickname}
              time={new Date(message.createdAt).toLocaleString()}
            >
              {message.body}
            </Message>
          ))}
      </MessageList>
    </Page>
  );
}

export default App;
