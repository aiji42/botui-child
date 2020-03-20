import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';

const InputPassword = ({ field, form, ...props }) => (
  <InputWithIcon type="password" autoComplete="new-password" field={field} form={form} {...props} />
);

InputPassword.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputPassword;

const validation = (name) => ({
  [name]: yup.string()
    .required('入力して下さい')
    .matches(/^[a-z\d]{8,100}$/i, '8文字以上の英数字で入力してください')
});

const initialValue = (name) => ({ [name]: '' });

export { validation, initialValue };