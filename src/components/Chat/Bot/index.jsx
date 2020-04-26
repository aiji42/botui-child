import React, { useEffect, useReducer } from 'react';
import { css } from '@emotion/core';
import Message from '../Message';
import Loading from '../Message/Loading';
import handshake, { prepare as handeshakePrepare } from '../../../handshake';
import { setDispatch } from '../../../conversation';
import { animateScroll } from 'react-scroll';

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

const scrollToBottom = () => { animateScroll.scrollToBottom({ smooth: true, duration: 600 }); };

const defaultMessageOption = { content: 'undefined', delay: 700, onSpoken: scrollToBottom };

const reducer = (state, action) => {
  if (action.type == 'ADD') {
    const exposedRellay = state.filter(({ id }) => id != 'RELLAY');
    const delay = state.some(({ id }) => id == 'RELLAY') ? 0 : defaultMessageOption.delay;
    return [...exposedRellay, { ...defaultMessageOption, delay, ...action.message }];
  }
  if (action.type == 'ROLLBACK') {
    const index = state.map(({ id }) => id).reverse().indexOf(action.message.id);
    return state.slice().reverse().slice(index).reverse(); // .reverse()破壊的メソッドであるため、.slice()を先に用いる
  }
  if (action.type == 'RELLAY') {
    const exposedRellay = state.filter(({ id }) => id != 'RELLAY');
    return [...exposedRellay, { ...defaultMessageOption, id: 'RELLAY', content: <Loading />, delay: 0, ...action.message }];
  }
};

const Bot = () => {
  const [messages, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    setDispatch(dispatch);
    const readyToStartChat = async () => {
      await handeshakePrepare();
      const parent = await handshake;
      parent.emit('readyToStartChat');
    };
    readyToStartChat();
  }, []);

  return (
    <div css={base}>
      {messages.map((message, i) => (
        <Message {...message} key={i} />
      ))}
    </div>
  );
};

export default Bot;