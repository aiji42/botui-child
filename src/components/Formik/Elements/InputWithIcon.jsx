import React from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import { css } from '@emotion/core';
import { okColor, errorColor, baseBorderColor } from '../../shared/baseStyle';

const base = css`
  padding: 8px 25px 8px 8px;
  border-radius: 3px;
  background-color: #ffffff;
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  font-size: 1.05em;
  box-sizing: border-box;
  &:focus {
    border-left-width 5px;
    transition: all 300ms 0s ease;
  }
`;

const title = css`
  font-size: 0.9em;
  line-height: 1;
  padding-top: 6px;
  padding-bottom: 4px;
`;

const isOk = css`
  border: solid 2px ${okColor};
`;

const noTouched = css`
  border: solid 2px ${baseBorderColor};
`;

const withError = css`
  border: solid 2px ${errorColor};
`;

const okIcon = css`
  float: right;
  position: relative;
  right: 5px;
  top: -28px;
  color: ${okColor};
  height: 0px;
`;

const style = ({ form, field }) => {
  const { name } = field;
  const { errors, touched, initialValues } = form;
  if (!errors[name]) return [base, isOk];
  if (!touched[name] && errors[name] && initialValues[name].length === 0) return [base, noTouched];
  if (errors[name]) return [base, withError];
};

const InputWithIcon = ({ field, form, innerRef, ...props }) => {
  return (
    <>
      <div css={title}>{props.title}</div>
      <input {...field} {...props} ref={innerRef} css={style({ form, field })} />
      {!form.errors[field.name] && <i css={okIcon} className="fa fa-sm fa-check-circle" />}
    </>
  );
};

InputWithIcon.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
  title: PropTypes.string.isRequired,
  innerRef: PropTypes.object
};

export default InputWithIcon;