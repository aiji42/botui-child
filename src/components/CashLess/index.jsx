import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import image from './cash-less.png';
import { css } from '@emotion/core';

const style = css`
  width: 100%;
  max-width: 180px;
`;

export const CashLess = ({ chatResolver, ...props }) => {
  useEffect(() => { chatResolver(); }, []);
  return <img css={style} src={image} {...props} />;
};

CashLess.propTypes = {
  chatResolver: PropTypes.func.isRequired
};
