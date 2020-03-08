import React from 'react';
import ReactDOM from 'react-dom';
import ChatField from './components/ChatField';
import { handshake } from './handshake';

window.dataLayer = window.dataLayer || [];

const main = async () => {
  const parent = await handshake;

  ReactDOM.render(<ChatField />, document.getElementById('root'));

  parent.emit('readyToStartChat');
};

main();