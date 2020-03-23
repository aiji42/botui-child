import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import SelectPaymentTime, * as paymentTime from '../Elements/SelectPaymentTime';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';

const form = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={SelectPaymentTime} name="paymentTime" title="支払回数" />
      <ErrorMessage name="paymentTime" component={SpanErrorMessage} />
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormPaymentTime = withFormik({
  mapPropsToValues: () => ({...paymentTime.initialValue('paymentTime')}),
  validationSchema: yup.object().shape({...paymentTime.validation('paymentTime')}),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.chatResolver();
    setSubmitting(false);
  },
})(form);

export default FormPaymentTime;