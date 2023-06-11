const { defineConfig } = require('cypress');

// eslint-disable-next-line no-undef
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
  },
});
