import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { subscribe } from '../../pubSub';

const base = css`
  background-color: #4f506a;
  width: 100%;
  height: 30px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const progress = css`
  background-color: #20224a;
  height: 30px;
  text-align: center;
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
    <div css={base}>
      <div css={[progress, { width: percentage }]} />
      <div css={remainingNumber}>{![0, null].includes(remaining) && `のこり${remaining}問で完了！`}</div>
    </div>
  );
};

export default Footer;