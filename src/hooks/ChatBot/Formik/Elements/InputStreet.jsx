import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import { findStoredValue } from '../../../../dataStore';

const InputStreet = ({ field, form, ...props }) => {
  return (
    <InputWithIcon type="text" placeholder="1-2-3" field={field} form={form} {...props} />
  );
};

InputStreet.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputStreet;

const validation = (name) => ({
  [name]: yup.string()
    .required('入力してください')
    .max(200, '入力内容が長すぎます')
});

const initialValue = (name) => ({ [name]: findStoredValue(name, '') });

export { validation, initialValue };