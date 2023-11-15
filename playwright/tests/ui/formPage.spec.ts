import { test, expect } from '@playwright/test';
import { FormPage, createFormPage, HERO_POWER } from '../../page-objects/formPage';
import { correctFormData, incorrectFormData, whitespaceFormData } from '../../test-data/formData';
import { NavbarComponent, createNavbarComponent } from '../../page-objects/components/navbar';

test.describe('Form Page Tests', () => {
    let formPage: FormPage;
    let navbar: NavbarComponent;

    test.beforeEach(async ({ page }) => {
        formPage = createFormPage(page);
        navbar = createNavbarComponent(page);
        await page.goto('/');
        await navbar.actions.clickFormNavItem();
    });

    test('should submit form with correct data and display in summary', async () => {
        await fillAndSubmitForm(formPage, correctFormData);

        await test.step('Verifying the submitted data', async () => {
            await expect(formPage.selectors.submittedName).toHaveText(correctFormData.name);
            await expect(formPage.selectors.submittedAlterEgo).toHaveText(correctFormData.alterEgo);
            await expect(formPage.selectors.submittedPower).toHaveText(correctFormData.heroPower);
        });
    });

    incorrectFormData.forEach((data, index) => {
        test(`should not submit form with incorrect data case ${index + 1}`, async () => {
            await test.step(`Creating a new hero for incorrect data case ${index + 1}`, async () => {
                await formPage.actions.createNewHero();
            });

            await fillAndSubmitForm(formPage, data);

            await test.step('Verifying that the submit button is disabled', async () => {
                await expect(formPage.selectors.submitButton).toBeDisabled();
                // We could also make more assertions here to verify that the error messages are displayed
            });
        });
    });

    test('should trim whitespace from name and alter ego fields', async () => {
        await fillAndSubmitForm(formPage, whitespaceFormData);

        await test.step('Verifying that whitespace is trimmed from name and alter ego fields', async () => {
            await expect(formPage.selectors.submittedName).toHaveText(correctFormData.name.trim());
            await expect(formPage.selectors.submittedAlterEgo).toHaveText(correctFormData.alterEgo.trim());
        });
    });
});

// Could be move to a helper file or a page object or whataver the convention is in the project
async function fillAndSubmitForm(formPage: FormPage, data: { name: string; alterEgo: string; heroPower?: HERO_POWER }) {
    await test.step(`Filling in the form with name: ${data.name}, alterEgo: ${data.alterEgo}, heroPower: ${data.heroPower}`, async () => {
        await formPage.actions.fillName(data.name);
        await formPage.actions.fillAlterEgo(data.alterEgo);
        if (data.heroPower) {
            await formPage.actions.selectHeroPower(data.heroPower);
        }
    });
}
