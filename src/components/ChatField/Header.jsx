import React from 'react';
import Logo from './Logo';
import { css } from '@emotion/core';

const style = css`
  background-color: #20224a;
  width: 100%;
  height: 55px;
  text-align: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const Header = (props) => (
  <div css={style} {...props}>
    <Logo />
  </div>
);

export default Header;