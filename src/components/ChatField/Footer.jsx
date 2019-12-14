import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { subscribe } from '../../PubSub';

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

const Footer = () => {
  const [percentage, setPercentage] = useState('0%');
  useEffect(() => {
    subscribe('progressPercentage', (message) => setPercentage(`${message}%`));
  }, []);

  return (
    <div css={base}>
      <div css={[progress, { width: percentage }]} />
    </div>
  );
};

export default Footer;