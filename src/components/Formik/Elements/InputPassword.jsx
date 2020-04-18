import React, { useState } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import { css } from '@emotion/core';

const input = css`
  width: 90%;
  display: inline-block;
`;

const icon = css`
  width: 8%;
  display: inline-block;
  margin-left: 3px;
  color: #4e4e4e;
`;

const InputPassword = ({ field, form, ...props }) => {
  const [passwordHide, setPasswordHide] = useState(true);
  return (
    <>
      <div css={input}>
        <InputWithIcon type={passwordHide ? 'password' : 'text'} autoComplete="new-password" field={field} form={form} {...props} />
      </div>
      <div css={icon} onClick={() => { setPasswordHide(!passwordHide); }}>
        <i className={`fa fa-lg ${passwordHide ? 'fa-eye-slash' : 'fa-eye'}`} />
      </div>
    </>
  );
};

InputPassword.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputPassword;

const validation = (name) => ({
  [name]: yup.string()
    .required('入力して下さい')
    .matches(/^[a-z\d!#$%&'"\\()*+,\-./:;<=>?@[\]^_`{|}~]+$/i, '英数字で入力してください')
});

const initialValue = (name) => ({ [name]: '' });

export { validation, initialValue };