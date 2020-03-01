import React, { useEffect } from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { formPropTypes } from '../PropTypes';
import { dataStore, saveStoreValue } from '../../../dataStore';
import InputFamilyName, * as familyName from '../Elements/InputFamilyName';
import InputFamilyNameKana, * as familyNameKana from '../Elements/InputFamilyNameKana';
import InputFirstName, * as firstName from '../Elements/InputFirstName';
import InputFirstNameKana, * as firstNameKana from '../Elements/InputFirstNameKana';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import * as AutoKana from 'vanilla-autokana';
import { css } from '@emotion/core';

const formBlockDetailHalf = css`
  display: inline-block;
  vertical-align: top;
  margin-bottom: 3px;
  width: 49%;
`;

const left = css`
  margin-right: 3px;
`;

const autokana = {};

const form = (props) => {
  const { handleSubmit, setStatus, status, setFieldValue } = props;
  const handleChange = () => setStatus({ ...status, submitted: false });

  useEffect(() => {
    autokana.familyName = AutoKana.bind('#familyName', '#familyNameKana', { katakana: true });
    autokana.firstName = AutoKana.bind('#firstName', '#firstNameKana', { katakana: true });
  }, []);

  const handleFamilyName = () => setFieldValue('familyNameKana', autokana.familyName.getFurigana());
  const handleFirstName = () => setFieldValue('firstNameKana', autokana.firstName.getFurigana());

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <div css={[formBlockDetailHalf, left]}>
        <Field component={InputFamilyName} name="familyName" id="familyName" title="姓" onInput={handleFamilyName} />
        <ErrorMessage name="familyName" component={SpanErrorMessage} />
      </div>
      <div css={formBlockDetailHalf}>
        <Field component={InputFirstName} name="firstName" id="firstName" title="名" onInput={handleFirstName} />
        <ErrorMessage name="firstName" component={SpanErrorMessage} />
      </div>
      <div css={[formBlockDetailHalf, left]}>
        <Field component={InputFamilyNameKana} name="familyNameKana" id="familyNameKana" title="セイ" />
        <ErrorMessage name="familyNameKana" component={SpanErrorMessage} />
      </div>
      <div css={formBlockDetailHalf}>
        <Field component={InputFirstNameKana} name="firstNameKana" id="firstNameKana" title="メイ" />
        <ErrorMessage name="firstNameKana" component={SpanErrorMessage} />
      </div>
      <Field component={ButtonSubmit} id="nextButtonInNameForm" />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormName = withFormik({
  mapPropsToValues: () => ({
    ...familyName.initialValue('familyName'),
    ...familyNameKana.initialValue('familyNameKana'),
    ...firstName.initialValue('firstName'),
    ...firstNameKana.initialValue('firstNameKana'),
  }),
  validationSchema: yup.object().shape({
    ...familyName.validation('familyName'),
    ...familyNameKana.validation('familyNameKana'),
    ...firstName.validation('firstName'),
    ...firstNameKana.validation('firstNameKana'),
  }),
  mapPropsToStatus: () => ({ submitted: false }),
  validateOnMount: true,
  handleSubmit: (values, { props, setStatus, status }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    setStatus({ ...status, submitted: true });
    props.chatResolver();
  },
})(form);

export default FormName;