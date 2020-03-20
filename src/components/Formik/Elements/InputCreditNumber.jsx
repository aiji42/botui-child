import React, { useEffect } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import CreditCard from 'credit-card';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import Moji from 'moji';
import { findStoredValue } from '../../../dataStore';

const onlyNum = (value) => (new Moji(`${value}`)).convert('ZE', 'HE').toString().replace(/[^0-9]/g, '');

const splitCardNum = (nums) => `${nums}`.split('').map((num, i) => (i > 0 && i % 4 === 0) ? ` ${num}` : num).join('');

const InputCreditNumber = ({ field, form, ...props }) => {
  const { setFieldValue, values } = form;
  useEffect(() => {
    const num = onlyNum(values[field.name]);
    if (num.length < 1) return;
    setFieldValue(field.name, splitCardNum(num));
  }, [values[field.name]]);

  return (
    <InputWithIcon type="tel" autoComplete="cc-number" field={field} form={form} {...props} />
  );
};

InputCreditNumber.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputCreditNumber;

export const validation = (name) => ({
  [name]: yup.string()
    .required('入力してください')
    .transform((val) => onlyNum(val))
    .matches(/\d{14,16}/, '正しい形式で入力してください')
    .test('credit-card-number', '正しい形式で入力してください', (val) => !!CreditCard.determineCardType(val))
});

export const initialValue = (name) => ({ [name]: findStoredValue(name, '') });