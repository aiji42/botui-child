import React from 'react';
import ReactDOM from 'react-dom';
import ChatField from './components/ChatField';
import { prepare } from './handshake';

(async () => {
  await prepare();

  ReactDOM.render(<ChatField />, document.getElementById('root'));
})();
