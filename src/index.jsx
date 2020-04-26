import React from 'react';
import ReactDOM from 'react-dom';
import Bot from './components/Chat/Bot';
import ErrorBoundary from './components/Bugsnag';

ReactDOM.render(
  <ErrorBoundary>
    <Bot />
  </ErrorBoundary>,
  document.getElementById('root')
);