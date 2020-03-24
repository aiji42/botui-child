import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import InputPassword, * as password from '../Elements/InputPassword';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';

const form = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputPassword} name="password" title="パスワード" />
      <ErrorMessage name="password" component={SpanErrorMessage} />
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormPassword = withFormik({
  mapPropsToValues: () => ({ ...password.initialValue('password') }),
  validationSchema: yup.object().shape({ ...password.validation('password') }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.chatResolver();
    setSubmitting(false);
  },
})(form);

export default FormPassword;