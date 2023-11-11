import { Locator, Page, expect } from '@playwright/test';

export enum ANGULAR_RESOURCE_LINKS {
    LEARN_ANGULAR = 'https://angular.io/tutorial',
    CLI_DOCUMENTATION = 'https://angular.io/cli',
    ANGULAR_BLOG = 'https://blog.angular.io/',
    ANGULAR_DEVTOOLS = 'https://angular.io/devtools/'
}

export  enum TERMINAL_BUTTONS {
    NEW_COMPONENT = 'New Component',
    ANGULAR_MATERIAL = 'Angular Material',
    ADD_PWA_SUPPORT = 'Add PWA Support',
    ADD_DEPENDENCY = 'Add Dependency',
    RUN_WATCH_TESTS = 'Run and Watch Tests',
    BUILD_FOR_PRODUCTION = 'Build for Production'
}

export enum TERMINAL_COMMANDS {
    NEW_COMPONENT = 'ng generate component xyz',
    ANGULAR_MATERIAL = 'ng add @angular/material',
    ADD_PWA_SUPPORT = 'ng add @angular/pwa',
    ADD_DEPENDENCY = 'ng add _____',
    RUN_WATCH_TESTS = 'ng test',
    BUILD_FOR_PRODUCTION = 'ng build'
}


export const enum FOOTER_LINKS {
    GITHUB_STARS = 'Love Angular? Give our repo a star.'
}

type IndexPageSelectors = {
    angularResourceLinks: (link: ANGULAR_RESOURCE_LINKS) => Locator;
    terminalButtonByText: (buttonText: TERMINAL_BUTTONS) => Locator;
    terminalPreText: Locator;
};

type IndexPageActions = {
    clickAngularResourceLink: (link: ANGULAR_RESOURCE_LINKS) => Promise<void>;
    clickTerminalButtonAndCheckCommand: (button: TERMINAL_BUTTONS) => Promise<void>;
};

export interface IndexPage {
    selectors: IndexPageSelectors;
    actions: IndexPageActions;
}

export const createIndexPage = (page: Page): IndexPage => {
    const selectors: IndexPageSelectors = {
        angularResourceLinks: (link: ANGULAR_RESOURCE_LINKS) => page.locator(`a[href="${link}"]`),
        terminalButtonByText: (buttonText: TERMINAL_BUTTONS) => page.locator('button').getByText(buttonText),
        terminalPreText: page.locator('.terminal pre'),
    };

    const actions: IndexPageActions = {
        clickAngularResourceLink: async (link: ANGULAR_RESOURCE_LINKS) => {
            await selectors.angularResourceLinks(link).click();
        },
        clickTerminalButtonAndCheckCommand: async (button: TERMINAL_BUTTONS) => {
            await selectors.terminalButtonByText(button).click();
        },
    };

    return {
        selectors,
        actions
    };
};