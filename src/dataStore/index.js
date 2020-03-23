import store from 'store';
import expirePlugin from 'store/plugins/expire';
store.addPlugin(expirePlugin);

const ONE_DAY_MILLI_SEC = 1000 * 24 * 60 * 60;

export const findStoredValue = (propaty, udef = '') => {
  const storedData = store.get('botui-child');
  if (!storedData) return udef;
  if (propaty in storedData) return storedData[propaty];
  return udef;
};

export const saveStoreValue = (key, value) => {
  const expiration = new Date().getTime() + ONE_DAY_MILLI_SEC;
  const storedData = store.get('botui-child') || {};
  storedData[key] = value;
  store.set('botui-child', storedData, expiration);
  return value;
};

export const dataStore = {
  familyName: null,
  familyNameKana: null,
  firstName: null,
  firstNameKana: null,
  postalCode: null,
  pref: null,
  city: null,
  street: null,
  tel: null,
  password: null,
  birthdayYear: null,
  birthdayMonth: null,
  birthdayDay: null,
  email: null,
  gender: null,
  mailmagazine: null,
  payment: null,
  creditCardNumber: null,
  creditCardCvc: null,
  creditCardExpiryYear: null,
  creditCardExpiryMonth: null,
  creditCardName: null,
  paymentTime: null,
  paymentMethods: {},
  paymentTimeChoices: {},
  deliveryDate: null,
  deliveryDateChoices: {},
  deliveryTimeChoices: {},
  deliveryTime: null,
  confirm: {}
};

export const setting = {
  conversations: []
};