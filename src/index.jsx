import React from 'react';
import ReactDOM from 'react-dom';
import ChatField from './components/ChatField';
import { handshake } from './handshake';

import { saveStoreValue, findStoredValue } from './dataStore';

window.dataLayer = window.dataLayer || [];

const shouldStartChat = ({ activateRate }) => {
  if (typeof activateRate !== 'number') return true;
  return saveStoreValue('activeate', findStoredValue('activeate', Math.random() <= activateRate));
};

const main = async () => {
  const parent = await handshake;

  ReactDOM.render(<ChatField />, document.getElementById('root'));

  window.dataLayer.push({
    event: 'analytics', eventCategory: 'botui-child', eventAction: 'activate',
    eventLabel: shouldStartChat(parent.model) ? 'true' : 'false'
  });
  shouldStartChat(parent.model) ? parent.emit('readyToStartChat') : parent.emit('doNotStartChat');
};

main();