import { expect } from "@playwright/test";
import { waitForTotalLoad } from "../helpers/CustomFunctions";
import variables from "../data/variables";

async function homePage(page) {
  await waitForTotalLoad(page, variables.LoginPage.home_page);
  await expect(page).toHaveURL(/.*saucedemo/);
  return await page.locator(variables.LoginPage.home_page);
}

export { homePage };
