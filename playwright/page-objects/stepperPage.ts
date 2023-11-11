import { Locator, Page } from '@playwright/test';

type StepperPageSelectors = {
    nameInput: Locator;
    nextButton: Locator;
    addressInput: Locator;
    backButton: Locator;
    resetButton: Locator;
    submittedName: Locator;
    submittedAddress: Locator;
};

type StepperPageActions = {
    fillName: (name: string) => Promise<void>;
    clickNext: () => Promise<void>;
    clickBack: () => Promise<void>;
    clickReset: () => Promise<void>;
};

export interface StepperPage {
    selectors: StepperPageSelectors;
    actions: StepperPageActions;
}

export const createStepperPage = (page: Page): StepperPage => {
    const selectors: StepperPageSelectors = {
        nameInput: page.locator('#mat-input-0'),
        nextButton: page.locator('button:has-text("Next")'),
        addressInput: page.locator('#mat-input-1'),
        backButton: page.locator('button:has-text("Back")'),
        resetButton: page.locator('button:has-text("Reset")'),
        submittedName: page.locator('text=Name:').locator('xpath=following-sibling::p'),
        submittedAddress: page.locator('text=Address:').locator('xpath=following-sibling::p')
    };

    const actions: StepperPageActions = {
        fillName: async (name: string) => {
            await selectors.nameInput.fill(name);
        },
        clickNext: async () => {
            await selectors.nextButton.click();
        },
        clickBack: async () => {
            await selectors.backButton.click();
        },
        clickReset: async () => {
            await selectors.resetButton.click();
        }
    };

    return {
        selectors,
        actions
    };
};
