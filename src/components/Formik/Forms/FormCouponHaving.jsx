import React, { useEffect } from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import RadioGroupCouponHaving, * as couponHaving from '../Elements/RadioGroupCouponHaving';
import SpanErrorMessage from '../Elements/SpanErrorMessage';

const form = (props) => {
  const { handleSubmit, values } = props;
  useEffect(() => {
    if (values.couponHaving) handleSubmit();
  }, [values]);

  return (
    <form>
      <Field component={RadioGroupCouponHaving} name="couponHaving" />
      <ErrorMessage name="couponHaving" component={SpanErrorMessage} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormCoupon = withFormik({
  mapPropsToValues: () => ({
    ...couponHaving.initialValue('couponHaving')
  }),
  validationSchema: yup.object().shape({
    ...couponHaving.validation('couponHaving')
  }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.chatResolver();
    setSubmitting(false);
  },
})(form);

export default FormCoupon;