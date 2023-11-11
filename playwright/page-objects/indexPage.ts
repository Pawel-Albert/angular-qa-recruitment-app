import { Locator, Page } from '@playwright/test';

export const enum ANGULAR_RESOURCE_LINKS {
    LEARN_ANGULAR = 'https://angular.io/tutorial',
    CLI_DOCUMENTATION = 'https://angular.io/cli',
    ANGULAR_BLOG = 'https://blog.angular.io/',
    ANGULAR_DEVTOOLS = 'https://angular.io/devtools/'
}

export const enum TERMINAL_BUTTONS {
    NEW_COMPONENT = 'New Component',
    ANGULAR_MATERIAL = 'Angular Material',
    ADD_PWA_SUPPORT = 'Add PWA Support',
    ADD_DEPENDENCY = 'Add Dependency',
    RUN_WATCH_TESTS = 'Run and Watch Tests',
    BUILD_FOR_PRODUCTION = 'Build for Production'
}

export const enum EXTERNAL_SITE_LINKS {
    MEETUP = 'Find a Local Meetup',
    DISCORD = 'Join the Conversation on Discord'
}

export const enum FOOTER_LINKS {
    GITHUB_STARS = 'Love Angular? Give our repo a star.'
}

type IndexPageSelectors = {
    angularResourceLinks: (link: ANGULAR_RESOURCE_LINKS) => Locator;
    terminalButton: Locator;
    externalSiteLinks: Locator;
    githubStars: Locator;
};

type IndexPageActions = {
    clickAngularResourceLink: (link: ANGULAR_RESOURCE_LINKS) => Promise<void>;
    clickTerminalButton: (button: TERMINAL_BUTTONS) => Promise<void>;
    clickExternalSiteLink: (link: EXTERNAL_SITE_LINKS) => Promise<void>;
    clickGithubStars: () => Promise<void>;
};

export interface IndexPage {
    selectors: IndexPageSelectors;
    actions: IndexPageActions;
}

export const createIndexPage = (page: Page): IndexPage => {
    const selectors: IndexPageSelectors = {
        angularResourceLinks: (link: ANGULAR_RESOURCE_LINKS) => page.locator(`a[href="${link}"]`),
        terminalButton: page.locator('.card.small'),
        externalSiteLinks: page.locator('footer a.circle-link'),
        githubStars: page.locator('footer [title="github-stars"]')
    };

    const actions: IndexPageActions = {
        clickAngularResourceLink: async (link: ANGULAR_RESOURCE_LINKS) => {
            await selectors.angularResourceLinks(link).click();
        },
        clickTerminalButton: async (button: TERMINAL_BUTTONS) => {
            await selectors.terminalButton.locator(`text=${button}`).click();
        },
        clickExternalSiteLink: async (link: EXTERNAL_SITE_LINKS) => {
            await selectors.externalSiteLinks.locator(`text=${link}`).click();
        },
        clickGithubStars: async () => {
            await selectors.githubStars.click();
        }
    };

    return {
        selectors,
        actions
    };
};
