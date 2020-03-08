import React from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import { css } from '@emotion/core';
import { okColor, errorColor } from '../../shared/baseStyle';

const base = css`
  padding: 8px 25px 8px 8px;
  border: solid 2px gray;
  border-radius: 3px;
  background-color: #ffffff;
  width: 100%;
  height: 42px;
  font-size: 1.1em;
  font-weight: normal;
  color: #000;
  margin-bottom: 0px;
`;

const title = css`
  font-size: 0.9em;
  line-height: 1;
  padding-top: 6px;
  padding-bottom: 4px;
`;

const isOk = css`
  border-color: ${okColor()};
`;
const noTouched = css`
  border-color: gray;
`;

const withError = css`
  border-color: ${errorColor()};
`;

const okIcon = css`
  float: right;
  position: relative;
  right: 5px;
  top: -28px;
  height: 0px;
  color: ${okColor()};
`;

const style = ({ form, field }) => {
  const { name } = field;
  const { errors, touched, initialValues } = form;
  if (!errors[name]) return [base, isOk];
  if (!touched[name] && errors[name] && initialValues[name].length === 0) return [base, noTouched];
  if (errors[name]) return [base, withError];
};

const SelectWithIcon = ({ field, form, children, ...props }) => {
  return (
    <>
      <div css={title}>{props.title}</div>
      <select {...field} {...props} css={style({ form, field })} >
        {children}
      </select>
      {!form.errors[field.name] && <i css={okIcon} className="fa fa-sm fa-check-circle" />}
    </>
  );
};

SelectWithIcon.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default SelectWithIcon;