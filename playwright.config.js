import { defineConfig } from '@playwright/test';

export default defineConfig({
  // ... other configuration ...

//   // 1. Configure a web server to run before tests
//   webServer: {
//     // This command starts your server using the entry point you defined
//     command: 'node server.js', 
//     url: 'http://localhost:3000',
//     reuseExistingServer: !process.env.CI, // Avoid starting a new server if one is already running locally
//   },

  use: {
    // 2. Set the base URL for API requests
    baseURL: 'http://localhost:3000',
    // ... other use options ...
  },
});
