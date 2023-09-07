import { Eyes } from "@applitools/eyes-playwright";

require("dotenv").config();

/**
 * Initializes an instance of Applitools Eyes for visual testing.
 * @param {string} mainName - The name of the main application being tested.
 * @param {string} testName - The name of the specific test being performed.
 * @param {string} id - The ID of the batch to which the test belongs.
 * @param {string} batchName - The name of the batch to which the test belongs.
 * @returns {import('@applitools/eyes-playwright').Eyes} The initialized Applitools Eyes instance.
 */
const initializeEyes = async (page, mainName, testName, id, batchName) => {
  const eyes = new Eyes();
  eyes.setBatch({ id: id, name: batchName });
  await eyes.open(page, mainName, testName);
  eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
  return eyes;
};

/**
 * Closes the Applitools Eyes instance.
 * @param {import('@applitools/eyes-playwright').Eyes} eyes - The Applitools Eyes instance to be closed.
 */
const closeEyes = async (eyes) => {
  await eyes.close();
};

/**
 * Performs a visual check with Applitools Eyes.
 * @param {import('@applitools/eyes-playwright').Eyes} eyes - The Applitools Eyes instance to perform the check.
 * @param {string} name - The name or tag for the visual check.
 * @param {import('@applitools/eyes-playwright').CheckSettings} checkSetting - The setting or target for the visual check.
 */
const checkEyes = async (eyes, name, checkSetting) => {
  await eyes.check(name, checkSetting);
};

async function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result.toString();
}

export default {
  generateRandomString,
  initializeEyes,
  closeEyes,
  checkEyes,
};
