import React from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import { css } from '@emotion/core';
import {findStoredValue} from "../../../dataStore";

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

const ButtonSubmit = ({ field, form, children, ...props }) => {
  const modified = Object.keys(form.values).some(key => findStoredValue(key) !== form.values[key])
  return (
    <button type="submit" {...field} {...props} css={style} disabled={!form.isValid || (form.submitCount > 0 && !modified)}>
      {!children && (form.submitCount > 0 && modified ? '変更' : '次へ')}
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