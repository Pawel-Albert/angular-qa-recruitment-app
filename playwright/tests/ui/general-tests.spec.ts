import { test, expect } from '@playwright/test';

test.describe('General application behavior', () => {
    test('redirects to the base URL on incorrect path', async ({ page }) => {
        await page.goto('/some-non-existent-page');
        await expect(page).toHaveURL('/');
    });
});
