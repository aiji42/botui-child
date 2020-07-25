import React from 'react';
import ReactDOM from 'react-dom';
import ChatBot from './components/ChatBot';
import ErrorBoundary from './components/ErrorBoundary';
import Communicator from './components/Communicator';

ReactDOM.render(
  <ErrorBoundary>
    <Communicator>
      <ChatBot />
    </Communicator>
  </ErrorBoundary>,
  document.getElementById('root')
);