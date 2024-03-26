// eslint-rules/index.js to satisfy ESLint: Plugins array cannot includes file paths.
module.exports = {
    rules: {
      'async-function-try-catch': require('./async-function-try-catch'),
      'on-snapshot-error-handling': require('./on-snapshot-error-handling')
    }
  };
  