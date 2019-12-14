import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import SelectWithIcon from './SelectWithIcon';
import { findStoredValue, dataStore } from '../../../dataStore';

const SelectDeliveryDate = ({ field, form, ...props }) => {
  return (
    <SelectWithIcon field={field} form={form} {...props}>
      {Object.keys(dataStore.deliveryDateChoices).map((key) => (
        <option key={key} value={key}>{dataStore.deliveryDateChoices[key]}</option>
      ))}
    </SelectWithIcon>
  );
};

SelectDeliveryDate.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default SelectDeliveryDate;

export const validation = (name) => ({
  [name]: yup.string()
});

export const initialValue = (name) => ({ [name]: findStoredValue(name, '') });