import React, { useEffect } from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import RadioGroupPayment, * as payment from '../Elements/RadioGroupPayment';
import SpanErrorMessage from '../Elements/SpanErrorMessage';

const form = (props) => {
  const { handleSubmit, values } = props;
  useEffect(() => {
    if (values.payment) handleSubmit();
  }, [values]);

  return (
    <form>
      <Field component={RadioGroupPayment} name="payment" />
      <ErrorMessage name="payment" component={SpanErrorMessage} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormPayment = withFormik({
  mapPropsToValues: () => ({...payment.initialValue('payment')}),
  validationSchema: yup.object().shape({...payment.validation('payment')}),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormPayment;