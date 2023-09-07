// required imports to execute commands
import { test, expect } from "@playwright/test";
import { homePage } from "../../models/pages/HomePage";
import { Login } from "../../models/pages/LoginPage";
import { accessPage } from "../../models/helpers/CustomFunctions";
import variables from "../../models/data/variables";

// making actions before each test block
test.beforeEach(async ({ page }) => {
  await accessPage(page);
  await expect(await homePage(page)).toBeVisible();
});

// making actions after each tests run
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) {
    console.log(`Passed ${testInfo.title} with status ${testInfo.status}`);
  } else {
    console.log(`Failed ${testInfo.title},- ended up at ${page.url()}`);
  }
});

// test block
test("Login - correct", async ({ page }) => {
  await Login(page, process.env.CORRECT_USERNAME, process.env.CORRECT_PASSWORD);
  await expect(page).toHaveURL(/.*inventory/);
});

test("Login - incorrect", async ({ page }) => {
  await Login(
    page,
    process.env.INCORRECT_USERNAME,
    process.env.INCORRECT_PASSWORD
  );
  await expect(page.locator(variables.LoginPage.error_message)).toBeVisible();
});
