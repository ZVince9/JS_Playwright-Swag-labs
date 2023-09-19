require("dotenv").config({ path: "./.env" });

//Main helpers:
async function accessPage(page) {
  //Access main page logic:
  let url = process.env.URL;

  //Clear cookies:
  try {
    await page.evaluate(() => window.localStorage.clear());
    await page.evaluate(() => window.sessionStorage.clear());
    await context.clearCookies();
  } catch {}

  //Before executing wait for load:
  await page.goto(url, { timeout: 100000, waitUntil: "load" });

  //Listener to close un-expected dialogs:
  await page.on("dialog", async function (dialog) {
    try {
      await dialog.accept();
    } catch (e) {}
  });
}

// random number generation
async function random(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// function to catch and error on specific page if needed
async function catchErroOnPage(page) {
  if (Number(process.env.ERROR_CATCH) === 1) {
    await page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.log("Console error: ");
        console.log(`Error text: "${msg.text()}"`);
      }
    });

    await page.on("requestfailed", (request) => {
      console.log("Request failed: ");
      console.log(
        request.url() +
          " Failure: " +
          JSON.stringify(request.failure()) +
          " Body: " +
          JSON.stringify(request.postDataJSON()),
      );
    });
  }
}

// function to call to see session storage or other data if needed
async function checkSessionStorate(page) {
  // if needed other data could be returned from sessionStorage
  let sessionStorage = await page.evaluate(() => sessionStorage);

  // this is returning lead_code
  let leadCode = sessionStorage.lead_code;

  return leadCode;
}

async function waitForTotalLoad(page, selector) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  await page.waitForSelector(selector, {
    state: "visible",
    timeout: Number(process.env.ELEMENT_WAIT_TIMEOUT),
  });
}

export {
  accessPage,
  random,
  checkSessionStorate,
  catchErroOnPage,
  waitForTotalLoad,
};
