import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import InputEmail, * as email from '../Elements/InputEmail';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';

const form = (props) => {
  const { handleSubmit, setStatus, status } = props;
  const handleChange = () => setStatus({ ...status, submitted: false });

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
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
  mapPropsToStatus: () => ({ submitted: false }),
  validateOnMount: true,
  handleSubmit: (values, { props, setStatus, status }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    setStatus({ ...status, submitted: true });
    props.chatResolver();
  },
})(form);

export default FormEmail;

