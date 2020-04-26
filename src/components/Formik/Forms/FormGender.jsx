import React, { useEffect } from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import RadioGroupGender, * as gender from '../Elements/RadioGroupGender';
import SpanErrorMessage from '../Elements/SpanErrorMessage';

const form = (props) => {
  const { handleSubmit, values } = props;
  useEffect(() => {
    if (values.gender) handleSubmit();
  }, [values]);

  return (
    <form>
      <Field component={RadioGroupGender} name="gender" />
      <ErrorMessage name="gender" component={SpanErrorMessage} />
    </form>
  );
};

form.propTypes = {
...formPropTypes
};

const FormGender = withFormik({
  mapPropsToValues: () => ({ ...gender.initialValue('gender') }),
  validationSchema: yup.object().shape({ ...gender.validation('gender') }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormGender;