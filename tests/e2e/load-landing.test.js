// required imports to execute commands
import { test, expect } from "@playwright/test";
import { homePage } from "../../models/pages/HomePage";
import { accessPage } from "../../models/helpers/CustomFunctions";

// making actions before each test block
test.beforeEach(async ({ page }) => {
  await accessPage(page);
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
test("Load landing page only", async ({ page }) => {
  await expect(await homePage(page)).toBeVisible();
});
