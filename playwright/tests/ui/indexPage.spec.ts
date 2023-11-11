import { test, expect } from '@playwright/test';
import {
    ANGULAR_RESOURCE_LINKS,
    TERMINAL_BUTTONS,
    TERMINAL_COMMANDS,
    createIndexPage
} from '../../page-objects/indexPage';

const EXPECTED_ANGULAR_URLS = {
    LEARN_ANGULAR: ANGULAR_RESOURCE_LINKS.LEARN_ANGULAR,
    CLI_DOCUMENTATION: ANGULAR_RESOURCE_LINKS.CLI_DOCUMENTATION,
    ANGULAR_BLOG: ANGULAR_RESOURCE_LINKS.ANGULAR_BLOG,
    ANGULAR_DEVTOOLS: 'https://angular.io/guide/devtools'
};

let indexPage: ReturnType<typeof createIndexPage>;

test.describe('Index Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        indexPage = createIndexPage(page);
        await page.goto('/');
    });

    test('should open new tabs with correct Angular resource URLs', async ({ page }) => {
        for (const resourceLinkKey of Object.keys(ANGULAR_RESOURCE_LINKS)) {
            await test.step(`Clicking on '${resourceLinkKey}' link and verifying its URL`, async () => {
                const resourceLink = ANGULAR_RESOURCE_LINKS[resourceLinkKey as keyof typeof ANGULAR_RESOURCE_LINKS];
                const expectedUrl = EXPECTED_ANGULAR_URLS[resourceLinkKey as keyof typeof EXPECTED_ANGULAR_URLS];

                const [newPage] = await Promise.all([
                    page.context().waitForEvent('page'),
                    indexPage.actions.clickAngularResourceLink(resourceLink)
                ]);

                await newPage.waitForLoadState('load');
                expect(newPage.url()).toBe(expectedUrl);

                await newPage.close();
            });
        }
    });

    test('should display correct terminal command when clicking terminal buttons', async () => {
        for (const terminalButtonKey of Object.keys(TERMINAL_BUTTONS)) {
            await test.step(`Clicking '${terminalButtonKey}' button and checking the displayed command`, async () => {
                const terminalButton = TERMINAL_BUTTONS[terminalButtonKey as keyof typeof TERMINAL_BUTTONS];
                const terminalCommand = TERMINAL_COMMANDS[terminalButtonKey as keyof typeof TERMINAL_COMMANDS];

                await indexPage.actions.clickTerminalButtonAndCheckCommand(terminalButton);
                await expect(indexPage.selectors.terminalPreText).toHaveText(terminalCommand);
            });
        }
    });
});
