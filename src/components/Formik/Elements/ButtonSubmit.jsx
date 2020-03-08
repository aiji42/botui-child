import React from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import { css } from '@emotion/core';

const style = css`
  display: block;
  width: 70%;
  padding: 12px 0;
  margin: 10px auto 0px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  background-color: #ea4e53;
  font-size: 1.1em;
  font-weight: bold;
  border-bottom: solid 3px #a97171;
  &:disabled {
    display: none;
  }
  &:active {
    -webkit-transform: translateY(3px);
    transform: translateY(3px);
    border-bottom: none;
    margin-bottom: 3px;
  }
`;

const ButtonSubmit = ({ field, form, children, ...props }) => {
  return (
    <button type="submit" {...field} {...props} css={style} disabled={!form.isValid || (form.status && form.status.submitted)}>
      {!children && (form.submitCount > 0 && !(form.status && form.status.submitted) ? '変更' : '次へ')}
      {!!children && children }
    </button>
  );
};

ButtonSubmit.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
  children: PropTypes.any
};

export default ButtonSubmit;