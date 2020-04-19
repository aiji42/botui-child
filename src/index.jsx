import React from 'react';
import ReactDOM from 'react-dom';
import ChatField from './components/ChatField';
import Field from './components/Chat/Field';
import { prepare } from './handshake';

// (async () => {
//   await prepare();

//   ReactDOM.render(<ChatField />, document.getElementById('root'));
// })();
ReactDOM.render(<Field />, document.getElementById('root'));