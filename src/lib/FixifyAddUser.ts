import * as playwright from '@playwright/test';

export async function run(page: playwright.Page, params) {
    await page.setViewportSize({ width: 1440, height: 1080 });
    await page.goto('https://elevenlabs.io/');
    await page.waitForLoadState();

    //// PLAYWRIGHT_STEP_START id=673390b19694754bcc7f8127
    ////      Description: Click on 'Try a sample' button

    const trySampleButton = page.getByRole('button', {
        name: 'Try a sample',
    });
    await trySampleButton.waitFor({ state: 'visible', timeout: 20000 });
    await trySampleButton.click();

    //// PLAYWRIGHT_STEP_START id=673391289694754bcc7f8128
    ////      Description: Replace content in the narration textarea for Brian.
}
