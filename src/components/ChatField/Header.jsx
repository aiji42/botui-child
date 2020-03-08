import React from 'react';
import Logo from './Logo';
import { css } from '@emotion/core';
import { mainColor } from '../shared/baseStyle';

const Header = (props) => {
  const style = css`
    background-color: ${mainColor()};
    width: 100%;
    height: 55px;
    text-align: center;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  `;

  return (
    <div css={style} {...props}>
      <Logo />
    </div>
  );
};

export default Header;