import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { setting } from '../../dataStore';

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  releaseStage: process.env.NODE_ENV,
  appVersion: process.env.COMMIT_REF,
  plugins: [new BugsnagPluginReact(React)],
  onError: (event) => {
    event.addMetadata('service', {code: setting.serviceCode});
  }
});
const ErrorBoundary = Bugsnag.getPlugin('react');

export default ErrorBoundary;