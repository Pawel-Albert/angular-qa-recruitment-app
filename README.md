# Playwright E2E Tests for Angular QA Recruitment App

This repository contains end-to-end tests for the Angular QA Recruitment App using Playwright.

## Setup

First, clone the repository and install the dependencies:

```bash
npm install
```

Next, install the required browsers for Playwright:

```bash
npx playwright install
```

## Running the tests

To execute the tests in the Chromium browser, run:

```bash
npm run test
```

If you wish to run tests across all configured browsers, use the following command:

```bash
npx playwright test
```

## Test Structure

- The `/tests` directory contains the test suites for the application.
- The `/pages` directory includes Page Object models that abstract interactions with each view in the application.
- The `/utils` directory holds the test data and utility functions that can be used across tests.

Currently, the test suite is configured to run using the Chromium browser only.

## Code Quality Tools

This project uses Prettier and ESLint to ensure code quality and consistency:

- **Prettier** is an opinionated code formatter that enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

Prettier is configured with the following settings in `.prettierrc`:

```json
{
    "trailingComma": "none",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true,
    "arrowParens": "avoid",
    "printWidth": 120,
    "bracketSpacing": true
}
```

## Additional Information

- The `package.json` file includes scripts to facilitate running the tests and installing browsers.
- The Playwright configuration is specified in `playwright.config.ts`, which sets up the testing environment.

For more information on Playwright and its capabilities, visit the [Playwright documentation](https://playwright.dev/).
