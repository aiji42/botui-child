import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const style = css`
  display: block;
  width: 70%;
  padding: 12px 0;
  margin: 10px auto 0px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  background-color: #ea4e53;
  font-size: 1.1em;
  font-weight: bold;
  border-bottom: solid 4px #a97171;
  &:disabled {
    opacity: 0.5
  }
  &:active {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
    border-bottom: none;
    margin-bottom: 4px;
  }
`;

const Button = ({ children, ...props }) => <button css={style} {...props}>{children}</button>;

Button.propTypes = {
  children: PropTypes.any
};

export default Button;