import { waitForTotalLoad } from "../helpers/CustomFunctions";
import variables from "../data/variables";

async function Login(page, username, password) {
  await waitForTotalLoad(page, variables.LoginPage.home_page);
  await page.fill(variables.LoginPage.username_input, username);
  await page.fill(variables.LoginPage.password_input, password);
  await page.click(variables.LoginPage.login_button);
}

export { Login };
