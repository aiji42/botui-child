import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { formPropTypes } from '../PropTypes';
import { dataStore, saveStoreValue } from '../../../dataStore';
import CreditCard from 'credit-card';
import InputCreditNumber, * as cardNumber from '../Elements/InputCreditNumber';
import InputCreditCvc, * as cardCvc from '../Elements/InputCreditCvc';
import SelectCreditExpiryYear, * as cardYear from '../Elements/SelectCreditExpiryYear';
import SelectCreditExpiryMonth, * as cardMonth from '../Elements/SelectCreditExpiryMonth';
import InputCreditName, * as cardName from '../Elements/InputCreditName';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';

const superNarrowField = css`
  display: inline-block;
  vertical-align: top;
  margin-bottom: 2px;
  width: 31%;
`;

const narrowField = css`
  display: inline-block;
  vertical-align: top;
  margin-bottom: 2px;
  width: 36%;
`;

const left = css`
  margin-right: 2px;
`;

const validate = ({ creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, creditCardCvc }, setErrors) => {
  const {
    validCardNumber,
    validExpiryMonth,
    validExpiryYear,
    validCvv,
    isExpired
  } = CreditCard.validate({
    cardType: CreditCard.determineCardType(creditCardNumber),
    number: creditCardNumber,
    expiryMonth: creditCardExpiryMonth,
    expiryYear: creditCardExpiryYear,
    cvv: creditCardCvc
  });

  if ([validCardNumber, validExpiryMonth, validExpiryYear, validCvv, !isExpired].every(bool => bool)) {
    setErrors({});
    return true;
  }

  const errors = {};
  if (!validCardNumber) errors.creditCardNumber = '正しいカード番号を入力してください';
  if (!validExpiryMonth || isExpired) errors.creditCardExpiryMonth = '正しい有効期限を選択してください';
  if (!validExpiryYear || isExpired) errors.creditCardExpiryYear = '正しい有効期限を選択してください';
  if (!validCvv) errors.creditCardCvc = '正しいセキュリティコードを入力してください';
  setErrors(errors);
  return false;
};

const form = (props) => {
  const { handleSubmit, values, setErrors } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputCreditNumber} name="creditCardNumber" title="クレジットカード番号" />
      <ErrorMessage name="creditCardNumber" component={SpanErrorMessage} />

      <div css={[superNarrowField, left]}>
        <Field component={SelectCreditExpiryMonth} name="creditCardExpiryMonth" title="月" />
      </div>
      <div css={[superNarrowField, left]}>
        <Field component={SelectCreditExpiryYear} name="creditCardExpiryYear" title="年" />
      </div>
      <div css={narrowField}>
        <Field component={InputCreditCvc} name="creditCardCvc" title="CVC" />
      </div>
      <ErrorMessage name="creditCardExpiryYear" component={SpanErrorMessage} />
      <ErrorMessage name="creditCardExpiryMonth" component={SpanErrorMessage} />
      <ErrorMessage name="creditCardCvc" component={SpanErrorMessage} />

      <Field component={InputCreditName} name="creditCardName" title="名前" />
      <ErrorMessage name="creditCardName" component={SpanErrorMessage} />

      <Field component={ButtonSubmit} onClick={() => { validate(values, setErrors); }} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormBirthDay = withFormik({
  mapPropsToValues: () => ({
    ...cardNumber.initialValue('creditCardNumber'),
    ...cardCvc.initialValue('creditCardCvc'),
    ...cardYear.initialValue('creditCardExpiryYear'),
    ...cardMonth.initialValue('creditCardExpiryMonth'),
    ...cardName.initialValue('creditCardName'),
  }),
  validationSchema: yup.object().shape({
    ...cardNumber.validation('creditCardNumber'),
    ...cardCvc.validation('creditCardCvc'),
    ...cardYear.validation('creditCardExpiryYear'),
    ...cardMonth.validation('creditCardExpiryMonth'),
    ...cardName.validation('creditCardName'),
  }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormBirthDay;