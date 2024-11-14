import * as playwright from '@playwright/test';

export async function run(page: playwright.Page, params) {
    await page.setViewportSize({ width: 1440, height: 1080 });
    await page.goto('https://www.ebi.ac.uk/ena/browser/home');
    await page.waitForLoadState();

    const searchInputFieldForEbolaStrain = page.getByPlaceholder(
        'Enter text search terms'
    );
    await searchInputFieldForEbolaStrain.waitFor({
        state: 'visible',
        timeout: 20000,
    });
    await searchInputFieldForEbolaStrain.click();
    await page.keyboard.type('ebola CCL053D7', { delay: 50 });
    await page.keyboard.press('Enter');

    // Click on the Ebola virus strain sequence result link
    const ebolaVirusSequenceResultLink = await page
        .locator('text=KY786026')
        .first();
    await ebolaVirusSequenceResultLink.waitFor({
        state: 'visible',
        timeout: 20000,
    });
    await ebolaVirusSequenceResultLink.click();

    const fastaLinkViewSection = page
        .getByRole('link', { name: 'FASTA' })
        .first();
    await fastaLinkViewSection.waitFor({ state: 'visible', timeout: 20000 });
    await fastaLinkViewSection.click();
}
