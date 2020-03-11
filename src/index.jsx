import React from 'react';
import ReactDOM from 'react-dom';
import ChatField from './components/ChatField';
import handshake, { prepare } from './handshake';

(async () => {
  await prepare();
  const parent = await handshake;
  window.dataLayer.push({
    stage: process.env.NODE_ENV,
    serviceCode: parent.model.setting.serviceCode
  });

  ReactDOM.render(<ChatField />, document.getElementById('root'));
})();
