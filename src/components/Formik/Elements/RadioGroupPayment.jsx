import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import RadioInput from './RadioInput';
import { dataStore } from '../../../dataStore';
import { css } from '@emotion/core';

const margin = css`
  margin-top: 2px;
  margin-bottom: 2px;
`;

const RadioGroupPayment = ({ field, form, ...props }) => {
  return (
    <>
      {Object.keys(dataStore.paymentMethods).map((key) => (
        <div css={margin} key={key}>
          <RadioInput title={dataStore.paymentMethods[key]} id={key} field={field} form={form} {...props} />
        </div>
      ))}
    </>
  );
};

RadioGroupPayment.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default RadioGroupPayment;

export const validation = (name) => ({
  [name]: yup.string().required('選択してください')
    .test('payment-on-of', '選択してください',
      (val) => Object.keys(dataStore.paymentMethods).includes(val)
    )
});

export const initialValue = (name) => ({ [name]: '' });