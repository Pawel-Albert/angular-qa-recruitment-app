import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './playwright',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 1,
    reporter: 'html',
    use: {
        baseURL: 'https://angular-qa-recruitment-app.netlify.app/',
        trace: 'retain-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
});
