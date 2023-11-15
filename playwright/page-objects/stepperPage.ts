import { Locator, Page } from '@playwright/test';

type StepperPageSelectors = {
    nameInput: Locator;
    nextButton: Locator;
    addressInput: Locator;
    backButton: Locator;
    resetButton: Locator;
    stepContentAddress: Locator;
    stepContentSummary: Locator;
    submittedName: Locator;
    submittedAddress: Locator;
};

type StepperPageActions = {
    fillName: (name: string) => Promise<void>;
    clickNextwithIndex: (index: number) => Promise<void>;
    clickBack: () => Promise<void>;
    fillAddress: (address: string) => Promise<void>;
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
        stepContentAddress: page.locator('#cdk-step-content-0-1'),
        stepContentSummary: page.locator('#cdk-step-content-0-2'),
        submittedName: page.locator('text=Name:'),
        submittedAddress: page.locator('text=Address:')
    };

    const actions: StepperPageActions = {
        fillName: async (name: string) => {
            await selectors.nameInput.fill(name);
        },
        clickNextwithIndex: async index => {
            await selectors.nextButton.nth(index).click();
        },
        clickBack: async () => {
            await selectors.backButton.click();
        },
        fillAddress: async (address: string) => {
            await selectors.addressInput.fill(address);
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
