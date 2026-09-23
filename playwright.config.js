import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 20_000,
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    // altijd eerst bouwen: anders test je de vorige dist en merk je dat niet
    command: 'npm run build && npx astro preview --ignore-lock --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1200, height: 900 } } },
    // een echte telefoonbrowser: <details>, :has() en localStorage doen het daar
    // net anders dan in Chrome
    { name: 'telefoon', use: { ...devices['iPhone 13'] } },
  ],
});
