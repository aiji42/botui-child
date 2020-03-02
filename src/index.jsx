import React from 'react';
import ReactDOM from 'react-dom';
import ChatField from './components/ChatField';
import './handshake';

// window.ga('send', 'event', 'chat', (chatLaunch ? 'start' : 'doNotStart'), 'fromCart');
ReactDOM.render(<ChatField />, document.getElementById('root'));
