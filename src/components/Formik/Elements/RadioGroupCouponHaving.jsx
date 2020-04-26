import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import RadioInput from './RadioInput';
import { css } from '@emotion/core';

const odd = css`
  margin-bottom: 5px;
`;

const RadioGroupCouponHaving = ({ field, form, ...props }) => {
  return (
    <>
      <div css={odd}>
        <RadioInput title="持っている" id={'true'} field={field} form={form} {...props} />
      </div>
      <div>
        <RadioInput title="持っていない" id={'false'} field={field} form={form} {...props} />
      </div>
    </>
  );
};

RadioGroupCouponHaving.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default RadioGroupCouponHaving;

export const validation = (name) => ({
  [name]: yup.string().required('選択してください')
});

export const initialValue = (name) => ({ [name]: '' });