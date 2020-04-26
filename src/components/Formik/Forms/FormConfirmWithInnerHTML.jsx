import React from 'react';
import { withFormik, Field } from 'formik';
import PropTypes from 'prop-types';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';
import { dataStore } from '../../../dataStore';

const base = css`
  color: #676879;
  border-radius: 5px;
  border: solid 2px #0f84fe;
  background-color: #fff;
  padding: 10px;
  line-height: 1.2em;
  font-size: 1.0em;
  h3 {
    margin 10px 0px 5px 0px;
  }
`;

const form = (props) => {
  const { handleSubmit } = props;

  return (
    <form css={base} onSubmit={handleSubmit}>
      <div dangerouslySetInnerHTML={{ __html: dataStore.confirmHTML }} />
      <Field name="confirmed" type="hidden" />
      <Field component={ButtonSubmit} >確定</Field>
    </form>
  );
};

form.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const FormConfirmWithInnerHTML = withFormik({
  mapPropsToValues: () => ({ confirmed: true }),
  handleSubmit: (values, { props, setSubmitting }) => {
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormConfirmWithInnerHTML;