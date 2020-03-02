import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import image from './cash-less.png';
import { css } from '@emotion/core';

const style = css`
  width: 100%;
  max-width: 180px;
`;

const messageStyle = `
  background-color: white;
  margin-left: 45px;
`;

export const CashLess = ({ chatResolver, ...props }) => {
  const imageEl = useRef(null);
  useEffect(() => {
    imageEl.current.parentElement.parentElement.style = messageStyle;
    chatResolver();
  }, []);
  return <img ref={imageEl} css={style} src={image} {...props} />;
};

CashLess.propTypes = {
  chatResolver: PropTypes.func.isRequired
};
