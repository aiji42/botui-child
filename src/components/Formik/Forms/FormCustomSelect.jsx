import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types'
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore } from '../../../dataStore';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit'
import SelectWithIcon from '../Elements/SelectWithIcon'

const sanitize = (selects) => selects.reduce((res, { name, title, options, optionsFromDataStore, storedName }) => (
  [...res, { name, title, options: (optionsFromDataStore ? dataStore[storedName] : options) }]
), [])

const form = (props) => {
  const { selects, handleSubmit } = props;
  const [sanitizedSelects, setSanitizedSelects] = useState([])
  useEffect(() => {
    setSanitizedSelects(sanitize(selects))
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      {sanitizedSelects.map(({ name, title, options }, index) => (
        <Fragment key={index}>
          <Field name={name}>
            {({ field, form }) => (
              <SelectWithIcon field={field} form={form} title={title}>
                {Object.keys(options).map((key, index) => <option key={index} value={key}>{options[key]}</option>)}
              </SelectWithIcon>
            )}
          </Field>
          <ErrorMessage name={name} component={SpanErrorMessage} />
        </Fragment>
      ))}
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.defaultProps = {
  choicesFromDataStore: false,
  selects: []
}

form.propTypes = {
  ...formPropTypes,
  selects: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
  })).isRequired
};

const FormCustomSelect = withFormik({
  mapPropsToValues: ({ selects }) => (selects.reduce((res, { name }) => ({ ...res, [name]: '' }), {})),
  validationSchema: ({ selects }) => yup.object().shape(selects.reduce((res, { name }) => ({ ...res, [name]: yup.string() }), {})),
  validateOnMount: true,
  handleSubmit: (values, { props: { onSubmited, onUpdate }, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] != null)) onUpdate();
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormCustomSelect;