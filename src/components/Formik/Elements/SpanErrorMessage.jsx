import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const error = css`
  color: red;
  margin-top: 3px;
  display: block;
`;

const SpanErrorMessage = ({ children }) => (<span css={error}>{children}</span>);

SpanErrorMessage.propTypes = {
  children: PropTypes.any.isRequired
};

export default SpanErrorMessage;