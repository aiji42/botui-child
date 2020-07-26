import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import { findStoredValue } from '../../../../dataStore';

const InputCity = ({ field, form, ...props }) => {
  return (
    <InputWithIcon type="text" placeholder="〇〇市〇〇町" field={field} form={form} {...props}/>
  );
};

InputCity.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputCity;

const validation = (name) => ({
  [name]: yup.string()
    .required('入力してください')
    .max(200, '入力内容が長すぎます')
});

const initialValue = (name) => ({ [name]: findStoredValue(name, '') });

export { validation, initialValue };