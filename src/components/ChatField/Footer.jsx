import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { subscribe } from '../../pubSub';
import { mainColor } from '../shared/baseStyle';

const base = () => css`
  background-color: ${mainColor()};
  opacity: 0.8;
  width: 100%;
  height: 30px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const remainingNumber = css`
  position: fixed;
  bottom: 0;
  right: 0;
  color: white;
  margin-bottom: 2px;
`;

const Footer = () => {
  const [percentage, setPercentage] = useState('0%');
  const [remaining, setRemaining] = useState(null);
  useEffect(() => {
    subscribe('progressPercentage', (message) => setPercentage(`${message}%`));
    subscribe('remainingNumber', (message) => setRemaining(message));
  }, []);

  return (
    <>
      <div css={[base(), { opacity: 1, backgroundColor: 'white' }]} />
      <div css={base()} />
      <div css={[base(), { opacity: 1, width: percentage }]} />
      <div css={remainingNumber}>{![0, null].includes(remaining) && `のこり${remaining}問で完了！`}</div>
    </>
  );
};

export default Footer;