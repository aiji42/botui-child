import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore } from '../../../dataStore';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import RadioInput from '../Elements/RadioInput'
import { css } from '@emotion/core'

const mergin = css`
  margin-top: 5px;
`;

const form = (props) => {
  const { name, choices, values, handleSubmit } = props;
  useEffect(() => {
    if (values[name]) handleSubmit();
  }, [values]);

  return (
    <form>
      <Field name={name}>
        {(formikField) => choices.map((choice, index) => (
          <div key={index} css={index > 0 ? mergin : ''}>
            <RadioInput {...choice} {...formikField} />
          </div>
        ))}
      </Field>
      <ErrorMessage name={name} component={SpanErrorMessage} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes,
  name: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  })).isRequired
};

const FormCustomRadioGroup = withFormik({
  validationSchema: ({ name }) => yup.object().shape({
    [name]: yup.string().required('選択してください')
  }),
  validateOnMount: true,
  handleSubmit: (values, { props: { onSubmited, onUpdate }, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] != null)) onUpdate();
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormCustomRadioGroup;