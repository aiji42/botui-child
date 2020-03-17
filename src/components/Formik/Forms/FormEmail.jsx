import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import InputEmail, * as email from '../Elements/InputEmail';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';

const form = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputEmail} name="email" title="メールアドレス" />
      <ErrorMessage name="email" component={SpanErrorMessage} />
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormEmail = withFormik({
  mapPropsToValues: () => ({ ...email.initialValue('email') }),
  validationSchema: yup.object().shape({ ...email.validation('email') }),
  validateOnMount: true,
  handleSubmit: (values, { props }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.chatResolver();
  },
})(form);

export default FormEmail;

