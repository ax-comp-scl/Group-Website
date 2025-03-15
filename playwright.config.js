import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  use: {
    baseURL: 'http://localhost:5173',
    browserName: 'chromium',
    headless: true,
  },
});