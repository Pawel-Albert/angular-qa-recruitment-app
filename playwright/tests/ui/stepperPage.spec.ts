import { test, expect } from '@playwright/test';
import { StepperPage, createStepperPage } from '../../page-objects/stepperPage';
import { correctStepperData, incorrectStepperData } from '../../test-data/stepperData';
import { NavbarComponent, createNavbarComponent } from '../../page-objects/components/navbar';

test.describe('Stepper Page Tests', () => {
  let stepperPage: StepperPage;
  let navbar: NavbarComponent;

  test.beforeEach(async ({ page }) => {
    stepperPage = createStepperPage(page);
	navbar = createNavbarComponent(page);
    await page.goto('/');
    await navbar.actions.clickStepperNavItem();
  });

  test('should complete stepper with correct data', async () => {
    await stepperPage.actions.fillName(correctStepperData.name);
    await stepperPage.selectors.nextButton.first().click();
    await stepperPage.actions.fillAddress(correctStepperData.address);
    await stepperPage.selectors.nextButton.nth(1).click();

    await expect(stepperPage.selectors.submittedName).toHaveText(` Name: ${correctStepperData.name}`);
    await expect(stepperPage.selectors.submittedAddress).toHaveText(` Address: ${correctStepperData.address}`);
  });

// Placeholder for potential test to cover full stepper flow with incorrect data
// incorrectStepperData.forEach((data, index) => {
//   test(`should not proceed to next step with incorrect data case ${index + 1}`, async () => {
//     await test.step(`Filling in name with: ${data.name}`, async () => {
//     });
//     await test.step('Checking if address step is not visible', async () => {
//     });
//    etc...
//   });
// });


  test('should reset stepper fields', async () => {
    await stepperPage.actions.fillName(correctStepperData.name);
    await stepperPage.actions.clickNextwithIndex(0);
    await stepperPage.actions.fillAddress(correctStepperData.address);
    await stepperPage.actions.clickNextwithIndex(1);

	await stepperPage.actions.clickReset();
    await expect(stepperPage.selectors.nameInput).toBeEmpty();
  });
});
