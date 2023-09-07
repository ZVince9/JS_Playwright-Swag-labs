// required imports to execute commands
import { test, expect } from "@playwright/test";
import { accessMainPage } from "../../models/helpers/CustomFunctions";
import {
  generateRandomString,
  initializeEyes,
  checkEyes,
  closeEyes,
} from "../../models/helpers/visualFunctions";
import { Target } from "@applitools/eyes-playwright";

//test variables:
let email;
let batchId;
let opp_button = '(//a[@class="cyan-button"])[1]';
let career_button = "//li[@id='menu-item-501']";

test.describe.configure({ mode: "parallel" });

// making actions before each test block
test.beforeEach(async ({ page }) => {
  batchId = await generateRandomString();
  await accessMainPage(page);
});

// making actions after each tests run
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) {
    console.log(
      `Passed ${testInfo.title} with status ${testInfo.status}, ${email}`
    );
  } else {
    console.log(
      `Failed ${testInfo.title}, ${email} - ended up at ${page.url()}`
    );
  }
});

test.describe("Visual regressions", () => {
  test("Visual test for home, opp, career pages", async ({ page }) => {
    const eyesInitialFirst = await initializeEyes(
      page,
      "App",
      "Home page",
      batchId,
      "TestingBatch"
    );
    await checkEyes(eyesInitialFirst, Target.window().fully());
    await closeEyes(eyesInitialFirst);

    const eyesInitialSecond = await initializeEyes(
      page,
      "App",
      "Opp page",
      batchId,
      "TestingBatch"
    );
    await page.click(opp_button);
    await expect(page).toHaveURL(/opportunities/);
    await checkEyes(eyesInitialSecond, Target.window().fully());
    await closeEyes(eyesInitialSecond);

    const eyesInitialThird = await initializeEyes(
      page,
      "App",
      "Career page",
      batchId,
      "TestingBatch"
    );
    await page.click(career_button);
    await expect(page).toHaveURL(/careers/);
    await checkEyes(eyesInitialThird, Target.window().fully());
    await closeEyes(eyesInitialThird);
  });
});
