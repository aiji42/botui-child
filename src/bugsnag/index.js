import bugsnag from '@bugsnag/js';

const bugsnagClient = bugsnag({
  apiKey: process.env.BUGSNAG_API_KEY,
  releaseStage: process.env.NODE_ENV,
  appVersion: process.env.COMMIT_REF
});

export default bugsnagClient;