import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import { findStoredValue } from '../../../../dataStore';

const InputEmail = ({ field, form, ...props }) => {
  return (
    <InputWithIcon type="email" placeholder="yamada@example.com" field={field} form={form} {...props} />
  );
};

InputEmail.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputEmail;

const validation = (name) => ({
  [name]: yup.string()
    .required('入力して下さい')
    .matches(/^([a-z0-9+_.-]+)@([a-z0-9-]+\.)+[a-z]{2,6}$/, '正しい形式で入力してください')
});

const initialValue = (name) => ({[name]: findStoredValue(name, '')});

export { validation, initialValue };