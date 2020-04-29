import React from 'react';
import ReactDOM from 'react-dom';
import ChatBot from './components/ChatBot';
import ErrorBoundary from './components/ErrorBoundary';
import Handshake from './components/Handshake';

ReactDOM.render(
  <ErrorBoundary>
    <Handshake>
      {({ onReady, handshake }) => <ChatBot handshake={handshake} onReady={onReady} />}
    </Handshake>
  </ErrorBoundary>,
  document.getElementById('root')
);