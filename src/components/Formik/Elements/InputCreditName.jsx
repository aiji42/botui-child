import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import { dataStore } from '../../../dataStore';

const InputCreditName = ({ field, form, ...props }) => {
  return (
    <InputWithIcon type="text" autoComplete="cc-name" field={field} form={form} {...props} placeholder="TARO YAMADA" />
  );
};

InputCreditName.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputCreditName;

export const validation = (name) => ({
  [name]: yup.string().required('入力して下さい')
});

export const initialValue = (name) => ({ [name]: dataStore[name] ? dataStore[name] : '' });