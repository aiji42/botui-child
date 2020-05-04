import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import SelectDeliveryDate, * as deliveryDate from '../Elements/SelectDeliveryDate';
import SelectDeliveryTime, * as deliveryTime from '../Elements/SelectDeliveryTime';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';

const form = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={SelectDeliveryDate} name="deliveryDate" title="お届け希望日" />
      <ErrorMessage name="deliveryDate" component={SpanErrorMessage} />

      <Field component={SelectDeliveryTime} name="deliveryTime" title="お届け希望時間帯" />
      <ErrorMessage name="deliveryTime" component={SpanErrorMessage} />
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormDeliveryDateTime = withFormik({
  mapPropsToValues: () => ({
    ...deliveryDate.initialValue('deliveryDate'),
    ...deliveryTime.initialValue('deliveryTime'),
  }),
  validationSchema: yup.object().shape({
    ...deliveryDate.validation('deliveryDate'),
    ...deliveryTime.validation('deliveryTime'),
  }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormDeliveryDateTime;