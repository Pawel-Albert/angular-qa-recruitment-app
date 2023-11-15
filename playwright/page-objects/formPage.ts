import { Locator, Page } from '@playwright/test';

export enum HERO_POWER {
    REALLY_SMART = 'Really Smart',
    SUPER_FLEXIBLE = 'Super Flexible',
    SUPER_HOT = 'Super Hot',
    WEATHER_CHANGER = 'Weather Changer'
}

type FormPageSelectors = {
    nameInput: Locator;
    alterEgoInput: Locator;
    heroPowerSelect: Locator;
    submitButton: Locator;
    newHeroButton: Locator;
};

type FormConfirmationSelectors = {
    h2: Locator;
    submittedName: Locator;
    submittedAlterEgo: Locator;
    submittedPower: Locator;
    editButton: Locator;
};

type FormPageActions = {
    fillName: (name: string) => Promise<void>;
    fillAlterEgo: (alterEgo: string) => Promise<void>;
    selectHeroPower: (power: HERO_POWER) => Promise<void>;
    submitForm: () => Promise<void>;
    createNewHero: () => Promise<void>;
};

export interface FormPage {
    selectors: FormPageSelectors & FormConfirmationSelectors;
    actions: FormPageActions;
}

export const createFormPage = (page: Page): FormPage => {
    const selectors: FormPageSelectors = {
        nameInput: page.locator('input#name'),
        alterEgoInput: page.locator('input#alterEgo'),
        heroPowerSelect: page.locator('select#power'),
        submitButton: page.locator('button:has-text("Submit")'),
        newHeroButton: page.locator('button:has-text("New Hero")')
    };

    const confirmationSelectors: FormConfirmationSelectors = {
        h2: page.locator('.container.results >> text=You submitted the following:'),
        submittedName: page.locator('.container.results >> text=Name').locator('xpath=following-sibling::div').first(),
        submittedAlterEgo: page
            .locator('.container.results >> text=Alter Ego')
            .locator('xpath=following-sibling::div')
            .first(),
        submittedPower: page
            .locator('.container.results >> text=Power')
            .locator('xpath=following-sibling::div')
            .first(),
        editButton: page.locator('.container.results >> button:has-text("Edit")')
    };

    const actions: FormPageActions = {
        fillName: async (name: string) => {
            await selectors.nameInput.fill(name);
        },
        fillAlterEgo: async (alterEgo: string) => {
            await selectors.alterEgoInput.fill(alterEgo);
        },
        selectHeroPower: async (power: HERO_POWER) => {
            await selectors.heroPowerSelect.selectOption({ label: power });
        },
        submitForm: async () => {
            await selectors.submitButton.click();
        },
        createNewHero: async () => {
            await selectors.newHeroButton.click();
        }
    };

    return {
        selectors: { ...selectors, ...confirmationSelectors },
        actions
    };
};
