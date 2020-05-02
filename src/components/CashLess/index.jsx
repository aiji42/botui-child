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
  margin-left: 50px;
`;

export const CashLess = ({ onSubmited, ...props }) => {
  const imageEl = useRef(null);
  useEffect(() => {
    imageEl.current.parentElement.parentElement.style = messageStyle;
    onSubmited();
  }, []);
  return <img ref={imageEl} css={style} src={image} {...props} />;
};

CashLess.propTypes = {
  onSubmited: PropTypes.func.isRequired
};
