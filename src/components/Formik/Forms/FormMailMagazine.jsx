import React, { useEffect } from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import RadioGroupMailMagazine, * as mailmagazine from '../Elements/RadioGroupMailMagazine';
import SpanErrorMessage from '../Elements/SpanErrorMessage';

const form = (props) => {
  const { handleSubmit, values } = props;
  useEffect(() => {
    if (values.mailmagazine) handleSubmit();
  }, [values]);

  return (
    <form>
      <Field component={RadioGroupMailMagazine} name="mailmagazine" />
      <ErrorMessage name="mailmagazine" component={SpanErrorMessage} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormMailMagazine = withFormik({
  mapPropsToValues: () => ({ ...mailmagazine.initialValue('mailmagazine') }),
  validationSchema: yup.object().shape({ ...mailmagazine.validation('mailmagazine') }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormMailMagazine;