import React from 'react';
import ChatBot from './ChatBot';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import { css } from '@emotion/core';
import '../../style.scss';

const style = css`
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
`;

const ChatField = () => {
  return (
    <ErrorBoundary>
      <div css={style}>
        <Header />
        <ChatBot />
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default ChatField;