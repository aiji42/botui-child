import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import RadioInput from './RadioInput';
import { css } from '@emotion/core';

const odd = css`
  margin-bottom: 5px;
`;

const RadioGroupMailMagazine = ({ field, form, ...props }) => {
  return (
    <>
      <div css={odd}>
        <RadioInput title="登録する" id={'true'} field={field} form={form} {...props} />
      </div>
      <div>
        <RadioInput title="登録しない" id={'false'} field={field} form={form} {...props} />
      </div>
    </>
  );
};

RadioGroupMailMagazine.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default RadioGroupMailMagazine;

export const validation = (name) => ({
  [name]: yup.string().required('選択してください')
});

export const initialValue = (name) => ({ [name]: '' });