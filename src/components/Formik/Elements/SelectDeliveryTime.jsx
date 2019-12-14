import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import SelectWithIcon from './SelectWithIcon';
import { findStoredValue, dataStore } from '../../../dataStore';

const SelectDeliveryTime = ({ field, form, ...props }) => {
  return (
    <SelectWithIcon field={field} form={form} {...props}>
      {Object.keys(dataStore.deliveryTimeChoices).map((key) => (
        <option key={key} value={key}>{dataStore.deliveryTimeChoices[key]}</option>
      ))}
    </SelectWithIcon>
  );
};

SelectDeliveryTime.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default SelectDeliveryTime;

export const validation = (name) => ({
  [name]: yup.string()
});

export const initialValue = (name) => ({ [name]: findStoredValue(name, '') });