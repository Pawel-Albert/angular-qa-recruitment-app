import { type Locator, type Page } from '@playwright/test';

type NavbarComponentSelectors = {
    navbar: Locator;
    logo: Locator;
    welcomeNavItem: Locator;
    formNavItem: Locator;
    stepperNavItem: Locator;
    twitterNavItem: Locator;
    youTubeNavItem: Locator;
};

type NavbarComponentActions = {
    clickFormNavItem: () => Promise<void>;
    clickStepperNavItem: () => Promise<void>;
};
export interface NavbarComponent {
    selectors: NavbarComponentSelectors;
    actions: NavbarComponentActions;
}

export const createNavbarComponent = (page: Page) => {
    const selectors: NavbarComponentSelectors = {
        navbar: page.locator('[role="banner"]'),
        logo: page.locator('[alt="Angular Logo"]'),
        welcomeNavItem: page.locator('#main-view-link'),
        formNavItem: page.locator('#form-view-link'),
        stepperNavItem: page.locator('#stepper-view-link'),
        twitterNavItem: page.locator('#angular-on-twitter-svg'),
        youTubeNavItem: page.locator('#angular-on-youtube-svg')
    };

    const actions: NavbarComponentActions = {
        clickFormNavItem: async () => {
            await selectors.formNavItem.click();
        },
        clickStepperNavItem: async () => {
            await selectors.stepperNavItem.click();
        }
    };
    return {
        selectors,
        actions
    };
};
