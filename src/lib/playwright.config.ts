import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: '.',
    testMatch: '**/all.test.ts',
    workers: 1,
    retries: 0,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['html', { open: 'never' }],
        ['list'],
        [
            './SimpleJsonPlaywrightReporter.ts',
            { runId: process.env.RUN_ID?.toString() || '' },
        ],
    ],
    // Enable each test to take 5 minutes, default is 30s
    timeout: 20_000,
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        trace: 'on',
        actionTimeout: 120_000,
        headless: true,
        contextOptions: {
            permissions: ['clipboard-read', 'clipboard-write'],
        },
        screenshot: 'on',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
