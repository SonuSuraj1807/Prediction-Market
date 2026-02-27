import { test, expect } from '@playwright/test';

test.describe('Core User Flows', () => {
    test('landing page should load and show hero text', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { name: /Predict the/i })).toBeVisible();
        await expect(page.locator('text=Sign In').first()).toBeVisible();
    });

    test('login page should show multiple auth options', async ({ page }) => {
        await page.goto('/login');
        await expect(page.locator('text=Continue with Google')).toBeVisible();
        await expect(page.locator('text=use email')).toBeVisible();
        await expect(page.locator('text=use phone')).toBeVisible();
    });

    test('markets page should load and show filters', async ({ page }) => {
        await page.goto('/markets');
        await expect(page.locator('text=Active Markets')).toBeVisible();
        await expect(page.locator('text=All Topics')).toBeVisible();
        // Check if the search bar is present
        await expect(page.locator('input[placeholder*="Search markets"]')).toBeVisible();
    });

    test('leaderboard page should load and show headers or empty state', async ({ page }) => {
        await page.goto('/leaderboard');
        // Wait for loading to finish if it shows up
        const loading = page.locator('text=Calculating rankings...');
        if (await loading.count() > 0) {
            await expect(loading).toBeHidden({ timeout: 10000 });
        }

        await expect(page.locator('h1')).toContainText('THE ELITE LIST');

        // Check for either headers or empty state message
        const hasTable = await page.getByRole('columnheader', { name: 'Rank' }).count() > 0;
        if (hasTable) {
            await expect(page.getByRole('columnheader', { name: 'Rank' })).toBeVisible();
            await expect(page.getByRole('columnheader', { name: 'Predictor' })).toBeVisible();
            await expect(page.getByRole('columnheader', { name: 'Balance' })).toBeVisible();
        } else {
            await expect(page.locator('text=No one on the board yet')).toBeVisible();
        }
    });
});
