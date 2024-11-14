import * as playwright from 'playwright';
import { expect } from 'playwright/test';
const RightArrowIcon = 'M12.5 12 8 7.5l2-2 6.5 6.5-6.5 6.5-2-2 4.5-4.5Z';

const partialChatPath = '/w/nhTzLv17zN/assistant';

export async function run(targetUrl: string, page: playwright.Page, params) {
    // Start on the homepage
    const chatButton = page.locator("text='Chat'").first();
    await chatButton.waitFor({ state: 'visible', timeout: 60_000 });
    await chatButton.click();

    // Click on a chat entry in history
    const rightArrowButton = page.locator(`svg path[d="${RightArrowIcon}"]`);
    const firstChatEntryButton = page
        .locator(`a[href*="${partialChatPath}"]`)
        .filter({ has: rightArrowButton })
        .nth(0);
    const chatEntryLink = await firstChatEntryButton.getAttribute('href');

    await firstChatEntryButton.waitFor({ state: 'visible', timeout: 60_000 });
    await firstChatEntryButton.click();

    // Click on 'Delete Conversation' button for chat;
    const deleteButton = page
        .locator("//*[@aria-label='Delete Conversation']")
        .first();
    await deleteButton.waitFor({ state: 'visible', timeout: 60_000 });
    await deleteButton.click();

    // Click on 'Delete for everyone' button to finalize chat deletion.;
    const deleteForEveryoneButton = page.getByRole('button', {
        name: 'Delete for everyone',
    });
    await deleteForEveryoneButton.waitFor({
        state: 'visible',
        timeout: 60_000,
    });
    await deleteForEveryoneButton.click();

    // Assert that the chat entry has been deleted;
    const confirmDeleted = page.locator(`a[href="${chatEntryLink}"]`);
    await expect(confirmDeleted).toHaveCount(0);
}
