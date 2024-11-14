import * as playwright from '@playwright/test';
import { expect } from 'playwright/test';

export async function run(targetUrl: string, page: playwright.Page, params) {
    await page.setViewportSize({ width: 1440, height: 1080 });
    await page.goto(targetUrl);
    await page.waitForLoadState();

    // Click on 'Sign in' button;
    const signInButton = page.getByRole('button', { name: 'Sign in' });
    await signInButton.waitFor({ state: 'visible', timeout: 1_000 });
    await signInButton.click();

    // Input empty string on 'Email address' field;
    const emptyEmailFieldInput = page.getByRole('textbox');
    await emptyEmailFieldInput.waitFor({ state: 'visible', timeout: 1_000 });
    await emptyEmailFieldInput.click();
    await page.keyboard.type('testing+dust@ranger.net', { delay: 50 });

    // Click on 'Continue' button;
    const continueButton = page.locator("text='Continue'").first();
    await continueButton.waitFor({ state: 'visible', timeout: 1_000 });
    await continueButton.click();

    // Enter password on password field;
    const passwordField = page.getByRole('textbox');
    await passwordField.waitFor({ state: 'visible', timeout: 1_000 });
    await passwordField.click();
    await page.keyboard.type('RangerTesting2024!', { delay: 50 });

    // Click on 'Continue' button;
    const continueLoginButton = page.getByRole('button', { name: 'Continue' });
    await continueLoginButton.waitFor({ state: 'visible', timeout: 1_000 });
    await continueLoginButton.click();

    await page.waitForLoadState('networkidle');

    // Type message in chat input field;
    const chatInputField = page.locator("//*[@contenteditable='true']").first();
    await chatInputField.waitFor({ state: 'visible', timeout: 1_000 });
    await chatInputField.click();
    await page.keyboard.type(
        "@dust what's the midpoint between Tokyo and London?",
        { delay: 50 }
    );
    await page.keyboard.press('Enter');

    // Click on the 'Share' button;
    const shareChatButton = page.getByRole('button', { name: 'Share' });
    await shareChatButton.waitFor({ state: 'visible', timeout: 1_000 });
    await shareChatButton.click();

    // Click on 'Copy the Link' button;
    const copyChatLinkButton = page.getByRole('button', {
        name: 'Copy the link',
    });
    await copyChatLinkButton.waitFor({ state: 'visible', timeout: 1_000 });
    await copyChatLinkButton.click();

    // Read text from clipboard
    const handle = await page.evaluateHandle(() =>
        navigator.clipboard.readText()
    );
    const clipboardContent = await handle.jsonValue();
    // Assert that the clipboard text matches the expected text, splitting URL because the target URLs are different
    expect(clipboardContent.split('/w/')[1]).toBe(page.url().split('/w/')[1]);
}
