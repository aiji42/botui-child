import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import { dataStore } from '../../../dataStore';

const InputCreditName = ({ field, form, ...props }) => {
  return (
    <InputWithIcon type="text" autoComplete="cc-name" field={field} form={form} {...props} />
  );
};

InputCreditName.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputCreditName;

export const validation = (name) => ({
  [name]: yup.string()
    .required('入力して下さい')
    .matches(/^[A-Z]+\s[A-Z]+$/, '大文字半角英字と半角スペースで入力してください')
});

export const initialValue = (name) => ({ [name]: dataStore[name] ? dataStore[name] : '' });