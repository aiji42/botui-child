import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../dataStore';
import InputPassword, * as password from '../Elements/InputPassword';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { setting } from '../../../dataStore';

const form = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputPassword} name="password" title="パスワード" />
      <ErrorMessage name="password" component={SpanErrorMessage} />
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormPassword = withFormik({
  mapPropsToValues: () => ({ ...password.initialValue('password') }),
  validationSchema: yup.object().shape({ ...password.validation('password') }),
  validate: (values) => {
    const { password } = setting.validations;
    if (!password) return;
    if (!!password.min && values.password.length < password.min) return { password: `${password.min}文字以上で入力してください` };
    if (!!password.max && values.password.length > password.max) return { password: `${password.max}文字以内で入力してください` };
    if (!!password.matches && !password.matches.test(values.password)) return { password: '使用できない文字が含まれています(半角英数字と記号で入力してください)' };
  },
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormPassword;