import React from 'react';
import bugsnagClient from '../../bugsnag';
import bugsnagReact from '@bugsnag/plugin-react';

bugsnagClient.use(bugsnagReact, React);
const ErrorBoundary = bugsnagClient.getPlugin('react');

export default ErrorBoundary;