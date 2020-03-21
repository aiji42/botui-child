import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import CreditCard from 'credit-card';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import { findStoredValue } from '../../../dataStore';

const splitCardNum = (nums) => `${nums}`.split('').map((num, i) => (i > 0 && i % 4 === 0) ? ` ${num}` : num).join('');

const InputCreditNumber = ({ field, form, ...props }) => {
  const { setFieldValue, setFieldTouched, values } = form;
  const [dummyNum, setDummyNum] = useState(splitCardNum(values[field.name]));
  useEffect(() => {
    const num = CreditCard.sanitizeNumberString(dummyNum);
    setFieldValue(field.name, num);
  }, [dummyNum]);

  const handleChange = (e) => setDummyNum(splitCardNum(CreditCard.sanitizeNumberString(e.target.value)));
  const handleBlur = () => setFieldTouched(field.name, true)

  return (
    <>
      <InputWithIcon type="tel" autoComplete="cc-number" field={field} form={form}
        value={dummyNum} name="cardNumberDummy" onChange={handleChange} onBlur={handleBlur}
         {...props}
      />
      <input type="hidden" {...field} {...props} />
    </>
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
    .transform((val) => CreditCard.sanitizeNumberString(val))
    .matches(/\d{14,16}/, '正しい形式で入力してください')
    .test('credit-card-number', '正しい形式で入力してください',
      (val) => !!CreditCard.determineCardType(val) && CreditCard.isValidCardNumber(val, CreditCard.determineCardType(val))
    )
});

export const initialValue = (name) => ({ [name]: findStoredValue(name, '') });