import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import InputTel, * as tel from '../Elements/InputTel';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';

const form = (props) => {
  const { handleSubmit, setStatus, status } = props;
  const handleChange = () => setStatus({ ...status, submitted: false });

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <Field component={InputTel} name="tel" title="電話番号(ハイフン無し)" />
      <ErrorMessage name="tel" component={SpanErrorMessage} />

      <Field component={ButtonSubmit} id="nextButtonInTelForm" />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormTel = withFormik({
  mapPropsToValues: () => ({ ...tel.initialValue('tel') }),
  validationSchema: yup.object().shape({ ...tel.validation('tel') }),
  mapPropsToStatus: () => ({ submitted: false }),
  validateOnMount: true,
  handleSubmit: (values, { props, setStatus }) => {
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    setStatus({ ...status, submitted: true });
    props.chatResolver();
  },
})(form);

export default FormTel;