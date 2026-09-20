import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 20_000,
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'npx astro preview --ignore-lock --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1200, height: 900 } } },
    { name: 'telefoon', use: { viewport: { width: 375, height: 700 }, isMobile: true } },
  ],
});
