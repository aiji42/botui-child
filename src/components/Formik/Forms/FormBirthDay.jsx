import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { formPropTypes } from '../PropTypes';
import { dataStore, saveStoreValue } from '../../../dataStore';
import SelectYear, * as year from '../Elements/SelectYear';
import SelectMonth, * as month from '../Elements/SelectMonth';
import SelectDay, * as day from '../Elements/SelectDay';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';

const formBlockDetailHalfField = css`
  display: inline-block;
  vertical-align: top;
  margin-bottom: 2px;
  width: 49%;
`;

const left = css`
  margin-right: 3px;
`;

const form = (props) => {
  const { handleSubmit, setStatus, status } = props;
  const handleChange = () => setStatus({ ...status, submitted: false });

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <Field component={SelectYear} name="birthdayYear" title="年" />
      <ErrorMessage name="birthdayYear" component={SpanErrorMessage} />

      <div css={[formBlockDetailHalfField, left]}>
        <Field component={SelectMonth} name="birthdayMonth" title="月" />
        <ErrorMessage name="birthdayMonth" component={SpanErrorMessage} />
      </div>
      <div css={formBlockDetailHalfField}>
        <Field component={SelectDay} name="birthdayDay" title="日" />
        <ErrorMessage name="birthdayDay" component={SpanErrorMessage} />
      </div>
      <Field component={ButtonSubmit} id="nextButtonInBirthdayForm" />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormBirthDay = withFormik({
  mapPropsToValues: () => ({
    ...year.initialValue('birthdayYear'),
    ...month.initialValue('birthdayMonth'),
    ...day.initialValue('birthdayDay'),
  }),
  validationSchema: yup.object().shape({
    ...year.validation('birthdayYear'),
    ...month.validation('birthdayMonth'),
    ...day.validation('birthdayDay'),
  }),
  validate: (values) => {
    const { birthdayYear, birthdayMonth, birthdayDay } = values;
    const date = new Date(birthdayYear, birthdayMonth - 1, birthdayDay);
    if (!!birthdayYear && !!birthdayMonth && !!birthdayDay && String(date.getMonth() + 1) !== birthdayMonth) {
      return { birthdayYear: '存在しない日付です', birthdayMonth: true, birthdayDay: true };
    }
    return {};
  },
  mapPropsToStatus: () => ({ submitted: false }),
  validateOnMount: true,
  handleSubmit: (values, { props, setStatus, status }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    setStatus({ ...status, submitted: true });
    props.chatResolver();
  },
})(form);

export default FormBirthDay;