require("dotenv").config({ path: "./.env" });
import { devices } from "@playwright/test";

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: "../tests",
  outputDir: "../output",
  preserveOutput: "failures-only",
  reporter: [["list"], ["junit", { outputFile: "../output/junit.xml" }]],

  retries: Number(process.env.RETRY_TIMES),
  timeout: 10000,
  expect: { timeout: 10000 },
  use: {
    headless: true,
    trace: "only-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
};

export default config;
