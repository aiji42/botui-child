import React from 'react';
import ReactDOM from 'react-dom';
import ChatField from './components/ChatField';
import { handshake } from './handshake';

window.dataLayer = window.dataLayer || [];

(async () => {
  const parent = await handshake;

  ReactDOM.render(<ChatField />, document.getElementById('root'), () => {
    window.dataLayer.push({
      stage: process.env.NODE_ENV,
      serviceCode: parent.model.setting.serviceCode
    });
    parent.emit('readyToStartChat');
  });
})();
