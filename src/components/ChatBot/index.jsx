import React from 'react';
import { css } from '@emotion/core';
import Message from './Message';
import { useChatBot } from '../../hooks/ChatBot';

const base = css`
  input, button, textarea, select {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    &:focus {
      outline: none;
    }
  }
  font-family: 'Noto Sans JP', sans-serif;
  padding: 0px 15px 100px 15px;
`;

const ChatBot = () => {
  const messages = useChatBot();

  return (
    <div css={base}>
      {messages.map((message, i) => (
        <Message {...message} key={i} />
      ))}
    </div>
  );
};

export default ChatBot;