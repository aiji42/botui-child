import React, { useRef, useEffect } from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { formPropTypes } from '../PropTypes';
import { dataStore, saveStoreValue } from '../../../dataStore';
import InputPostalCode, * as postalCode from '../Elements/InputPostalCode';
import SelectPref, * as pref from '../Elements/SelectPref';
import InputCity, * as city from '../Elements/InputCity';
import InputStreet, * as street from '../Elements/InputStreet';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { postalCode as postalCodeApi } from '../../../apis';

const validate = async ({ postalCode }, setFieldError) => {
  if (await postalCodeApi.isExisting(postalCode)) return true;

  setFieldError('postalCode', '存在しない郵便番号です。');
  return false;
};

const form = (props) => {
  const { handleSubmit, setFieldValue, values } = props;

  const inputStreetEl = useRef(null);

  useEffect(() => {
    const autoComplete = async () => {
      const val = postalCode.validation('')[''].cast(values.postalCode);
      if (val.length === 7) inputStreetEl.current.focus();
      const data = await postalCodeApi.search(val);
      if (!data) return;
      const { prefcode, city, town, street } = data;
      setFieldValue('pref', prefcode);
      setFieldValue('city', city + town + street);
    };
    autoComplete();
  }, [values.postalCode]);

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputPostalCode} name="postalCode" title="郵便番号"/>
      <ErrorMessage name="postalCode" component={SpanErrorMessage} />

      <Field component={SelectPref} name="pref" title="都道府県" />
      <ErrorMessage name="pref" component={SpanErrorMessage} />

      <Field component={InputCity} name="city" title="市区町村" />
      <ErrorMessage name="city" component={SpanErrorMessage} />

      <Field component={InputStreet} innerRef={inputStreetEl} name="street" title="番地・マンション名・部屋番号" />
      <ErrorMessage name="street" component={SpanErrorMessage} />

      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormAddress = withFormik({
  mapPropsToValues: () => ({
    ...postalCode.initialValue('postalCode'),
    ...pref.initialValue('pref'),
    ...city.initialValue('city'),
    ...street.initialValue('street'),
  }),
  validationSchema: yup.object().shape({
    ...postalCode.validation('postalCode'),
    ...pref.validation('pref'),
    ...city.validation('city'),
    ...street.validation('street'),
  }),
  validateOnMount: true,
  handleSubmit: async (values, { props, setFieldError }) => {
    if (!(await validate(values, setFieldError))) return;
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.chatResolver();
  },
})(form);

export default FormAddress;