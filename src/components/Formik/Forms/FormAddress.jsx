import React from 'react';
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

const form = (props) => {
  const { handleSubmit, setStatus, status, setFieldValue, setFieldTouched } = props;
  const doFormChange = () => setStatus({ ...status, submitted: false });

  return (
    <form onSubmit={handleSubmit} onChange={doFormChange}>
      <Field component={InputPostalCode} name="postalCode" title="郵便番号"
        onInput={async (e) => {
          const data = await postalCodeApi.search(postalCode.validation('')[''].cast(e.target.value));
          if (!data) return;
          const { prefcode, city, town, street } = data;
          setFieldValue('pref', prefcode);
          setFieldValue('city', city + town + street);
          setFieldTouched('pref', true);
          setFieldTouched('city', true);
          document.querySelector('[name=street]').focus();
        }}
      />
      <ErrorMessage name="postalCode" component={SpanErrorMessage} />

      <Field component={SelectPref} name="pref" title="都道府県" />
      <ErrorMessage name="pref" component={SpanErrorMessage} />

      <Field component={InputCity} name="city" title="市区町村" />
      <ErrorMessage name="city" component={SpanErrorMessage} />

      <Field component={InputStreet} name="street" title="番地・マンション名・部屋番号" />
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
  mapPropsToStatus: () => ({ submitted: false }),
  validateOnMount: true,
  handleSubmit: async (values, { props, setFieldError, setStatus, status }) => {
    if (!(await postalCodeApi.isExisting(values.postalCode))) {
      setFieldError('postalCode', '存在しない郵便番号です。');
      document.querySelector('[name=postalCode]').focus();
      return;
    }
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    setStatus({ ...status, submitted: true});
    props.chatResolver();
  },
})(form);

export default FormAddress;