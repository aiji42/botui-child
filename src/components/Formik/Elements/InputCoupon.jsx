import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import { findStoredValue } from '../../../dataStore';

const InputCoupon = ({ field, form, ...props }) => {
  return (
    <InputWithIcon type="text" placeholder="クーポン番号" field={field} form={form} {...props} />
  );
};

InputCoupon.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputCoupon;

export const validation = (name) => ({
  [name]: yup.string()
    .required('入力してください')
    .max(200, '入力内容が長すぎます')
});

export const initialValue = (name) => ({ [name]: findStoredValue(name, '') });