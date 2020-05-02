import React, { useEffect } from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import RadioGroupMembership, * as membership from '../Elements/RadioGroupMembership';
import SpanErrorMessage from '../Elements/SpanErrorMessage';

const form = (props) => {
  const { handleSubmit, values } = props;
  useEffect(() => {
    if (values.membership) handleSubmit();
  }, [values]);

  return (
    <form>
      <Field component={RadioGroupMembership} name="membership" />
      <ErrorMessage name="membership" component={SpanErrorMessage} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormMembership = withFormik({
  mapPropsToValues: () => ({ ...membership.initialValue('membership') }),
  validationSchema: yup.object().shape({ ...membership.validation('membership') }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormMembership;