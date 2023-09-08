// required imports to execute commands
import { test, expect } from "@playwright/test";
import { accessPage } from "../../models/helpers/CustomFunctions";
import {
  generateRandomString,
  initializeEyes,
  checkEyes,
  closeEyes,
} from "../../models/helpers/visualFunctions";
import { Target } from "@applitools/eyes-playwright";
import { Login } from "../../models/pages/LoginPage";

//test variables
let batchId;
test.describe.configure({ mode: "parallel" });

// making actions before each test block
test.beforeEach(async ({ page }) => {
  batchId = await generateRandomString();
  await accessPage(page);
});

// making actions after each tests run
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) {
    console.log(`Passed ${testInfo.title} with status ${testInfo.status}`);
  } else {
    console.log(`Failed ${testInfo.title} - ended up at ${page.url()}`);
  }
});

test.describe("Visual regressions", () => {
  test("Visual test for Login page", async ({ page }) => {
    const eyesInitialFirst = await initializeEyes(
      page,
      "App",
      "Login page",
      batchId,
      "test-batch"
    );
    await checkEyes(eyesInitialFirst, Target.window().fully());
    await closeEyes(eyesInitialFirst);
  });

  test("Visual test for inventory page", async ({ page }) => {
    await Login(
      page,
      process.env.CORRECT_USERNAME,
      process.env.CORRECT_PASSWORD
    );
    await expect(page).toHaveURL(/.*inventory/);
    const eyesInitialFirst = await initializeEyes(
      page,
      "App",
      "Inventory page",
      batchId,
      "test-batch"
    );
    await checkEyes(eyesInitialFirst, Target.window().fully());
    await closeEyes(eyesInitialFirst);
  });
});
