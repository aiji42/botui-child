import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import SelectWithIcon from './SelectWithIcon';
import { findStoredValue, dataStore } from '../../../dataStore';

const SelectPaymentTime = ({ field, form, ...props }) => {
  return (
    <SelectWithIcon field={field} form={form} {...props}>
      {Object.keys(dataStore.paymentTimeChoices).map((key) => (
        <option key={key} value={key}>{dataStore.paymentTimeChoices[key]}</option>
      ))}
    </SelectWithIcon>
  );
};

SelectPaymentTime.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default SelectPaymentTime;

export const validation = (name) => ({
  [name]: yup.string()
});

export const initialValue = (name) => ({ [name]: findStoredValue(name, '') });