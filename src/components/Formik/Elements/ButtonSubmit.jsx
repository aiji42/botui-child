import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import { css } from '@emotion/core';
import { findStoredValue, dataStore } from '../../../dataStore';

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

const isSubmitedOnce = (values) => Object.keys(values).every(key => !!dataStore[key]);
const isModified = (values) => Object.keys(values).some(key => findStoredValue(key) !== values[key]);

const ButtonSubmit = ({ field, form, children, ...props }) => {
  const [modified, setModified] = useState(false);
  const [submitedOnce, setSubmitedOnce] = useState(false);
  const { values, isValid, isSubmitting } = form;
  useEffect(() => { setModified(isModified(values)); }, [values]);
  useEffect(() => {
    if (isSubmitting) return;
    setModified(false);
    setSubmitedOnce(isSubmitedOnce(values));
  }, [isSubmitting]);

  return (
    <button type="submit" onBlur={field.handleBlur} {...props} css={style} disabled={!isValid || (submitedOnce && !modified)}>
      {!children && (submitedOnce && modified ? '変更' : '次へ')}
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