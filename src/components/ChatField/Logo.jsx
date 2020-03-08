import React from 'react';
import { css } from '@emotion/core';
import { setting } from '../../dataStore';

const style = css`
  box-sizing: content-box;
  max-height: 25px;
  margin-right: auto;
  margin-left: auto;
  padding: 15px 0;
`;

const Logo = (props) => <img css={style} src={setting.logo} {...props} />;
export default Logo;