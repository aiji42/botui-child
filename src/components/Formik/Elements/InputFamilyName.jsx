import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import { findStoredValue } from '../../../dataStore';

const removeSpace = (value) => value.replace(/[\s]/g, '');

const InputFamilyName = ({ field, form, ...props }) => {
  return (
    <InputWithIcon type="text" placeholder="山田" field={field} form={form} {...props}
      onBlur={(e) => {
        form.setFieldValue(field.name, removeSpace(e.target.value));
        field.onBlur(e);
      }}
    />
  );
};

InputFamilyName.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputFamilyName;

const validation = (name) => ({
  [name]: yup.string()
    .required('入力してください')
    .transform(removeSpace)
    .max(50, '入力内容が長すぎます')
});

const initialValue = (name) => ({ [name]: findStoredValue(name, '') });

export { validation, initialValue };