import path from 'path';
import { test } from '@playwright/test';
import { run as dustShareChat } from './dustShareChat';
import { run as dustDeleteChat } from './dustDeleteChat';
import { run as anthropicEbola } from './anthropicEbola';
import { run as testTest } from './FixifyAddUser'; // modify this file path to match your test file

const targetUrl = 'https://front-qa.dust.tt/';
const params = {};

test.beforeEach(async ({ page }) => {
    // Reset cookies before each test
    await page.context().clearCookies();
});

test(
    'Share a Chat',
    {
        tag: '@id=672e622fdb16c6e9a0ddb027',
    },
    async ({ page }) => {
        await dustShareChat(targetUrl, page, params);
    }
);

test(
    'Navigate to Ebola FASTA Sequence',
    {
        tag: '@id=672db5ed93f211bd7f9c68d7',
    },
    async ({ page }) => {
        await anthropicEbola(page, params);
    }
);

test('Test a Test', async ({ page }) => {
    await testTest(page, params);
});
