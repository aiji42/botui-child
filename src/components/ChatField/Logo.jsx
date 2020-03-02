import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { setting } from '../../dataStore';
import { subscribe } from '../../pubSub';

const style = css`
  box-sizing: content-box;
  max-height: 25px;
  margin-right: auto;
  margin-left: auto;
  padding: 15px 0;
`;

const Logo = (props) => {
  const [logo, setLogo] = useState('');
  useEffect(() => {
    subscribe('setting.logo', () => { setLogo(setting.logo); });
  }, []);

  return <img css={style} src={logo} {...props} />;
};
export default Logo;