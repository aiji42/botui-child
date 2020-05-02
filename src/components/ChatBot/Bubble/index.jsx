import React from 'react';
import PropTypes from 'prop-types';
import {css} from '@emotion/core';

const base = css`
  line-height: 1.3;
  background-color: #0f84fe;
  color: #ffffff;
  padding: 8px;
  border-radius: 12px;
  width: auto;
  max-width: 75%;
  display: inline-block;
`;

const humanStyle = css`
  color: #000000;
  background-color: #eeeeee;
  width: 80%;
  max-width: 80%;
  float: right;
`;

const Bubble = ({ children, human }) => {
  return (
    <div css={human ? [base, humanStyle] : base}>
      {children}
    </div>
  );
};

Bubble.defaultProps = {
  human: false
};

Bubble.propTypes = {
  children: PropTypes.any,
  human: PropTypes.bool.isRequired
};

export default Bubble;