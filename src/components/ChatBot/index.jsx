import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Message from './Message';
import { messenger } from './reducer';
import { conversationPrepare } from '../../conversation';


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

const ChatBot = ({ onReady, handshake }) => {
  const [messages, dispatch] = useReducer(messenger, []);

  useEffect(() => {
    conversationPrepare(dispatch, handshake);
    onReady();
  }, []);

  return (
    <div css={base}>
      {messages.map((message, i) => (
        <Message {...message} key={i} />
      ))}
    </div>
  );
};

ChatBot.propTypes = {
  onReady: PropTypes.func.isRequired,
  handshake: PropTypes.object.isRequired
};

export default ChatBot;