import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  retries: 1,
  use: {
    baseURL: 'https://shop.mango.com/preHome.faces',
    trace: 'on-first-retry',
    headless: false,
    // Default Desktop viewport
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // Mobile devices
    // {
    //   name: 'iphone-14-pro-max',
    //   use: { ...devices['iPhone 14 Pro Max'], viewport: { width: 430, height: 932 } },
    // },
    // {
    //   name: 'Samsung Galaxy S22',
    //   use: { ...devices['Samsung Galaxy S22'], viewport: { width: 360, height: 780 } },
    // },
    // {
    //   name: 'Iphone 5',
    //   use: { ...devices['Iphone 5'], viewport: { width: 320, height: 568 } },
    // },
  ],
});
