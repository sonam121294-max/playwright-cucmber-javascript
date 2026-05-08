const {
  Given,
  When,
  Then,
  Before,
  After,
  Status,
  AfterAll,
} = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");
const axios = require("axios");
const { TOTP } = require("totp-generator");
const { getLocatorValueFromJS } = require("../lib/utils/helper");
const {
  getSharedData,
  setSharedData,
  sharedData,
} = require("../lib/cacheData");
const { extractData } = require("../lib/dataFactory");
const { timeouts } = require("../lib/utils/timeout");
var { setDefaultTimeout } = require("@cucumber/cucumber");
const chai = require("chai");
const expect_mobile = chai.expect;

// const { sequelize } = require("../../../../models");

async function DB_connection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// DB_connection();

setDefaultTimeout(timeouts.get("cucumber_timeout"));
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function isAppTest() {
  return global.driver.drivertype === "app";
}

After(async (testCase) => {
  if (testCase.result.status === Status.FAILED) {
    await global.driver.screenshot({
      path: "screenshots/" + testCase.pickle.name + ".png",
    });
  }
});

AfterAll(async () => {
  if (!isAppTest()) {
    console.log("closing browser");
    if (global.pages && global.pages.size) {
      await Promise.all(
        [...global.pages.values()].map(async (driver) => {
          try {
            await driver.close();
          } catch (error) {
            console.log("error while closing page", error?.message || error);
          }
        })
      );
    } else if (global.driver) {
      try {
        await global.driver.close();
      } catch (error) {
        console.log("error while closing driver", error?.message || error);
      }
    }
  }
});

Given("user navigates to {string}", async (url) => {
  try {
    const data = await extractData(url);
    await global.driver.goto(data);
    await delay(2000);
  } catch (error) {
    console.log("error", error);
  }
});

Given("user refreshes page", async () => {
  if (isAppTest()) {
    await global.driver.refresh();
  } else {
    await global.driver.reload();
  }
});
Given("user navigates backward", async () => {
  try {
    if (isAppTest()) {
      await global.driver.back();
    } else {
      await global.driver.goBack();
    }
  } catch (e) {
    console.log("hererererre", e);
  }
});

Given("user navigates forward", async () => {
  if (isAppTest()) {
    await global.driver.forward();
  } else {
    await global.driver.goForward();
  }
});

Given("user clears input field {string}", async (locator) => {
  if (isAppTest()) {
    await delay(2000);
    await global.driver.$(getLocatorValueFromJS(locator)).clearValue();
  } else {
    await global.driver.locator(getLocatorValueFromJS(locator)).clear();
  }
});

Given("user enters {string} into input {string}", async (input, locator) => {
  const data = await extractData(input);
  if (isAppTest()) {
    await global.driver.$(getLocatorValueFromJS(locator)).setValue(data);
    await delay(2000);
  } else {
    await delay(1000);
    await global.driver.locator(getLocatorValueFromJS(locator)).fill(data);
  }
});

Given(
  "user enters {string} as otp one by one in input {string}",
  async (input, locator) => {
    const otp = String(await extractData(input));
    if (isAppTest()) {
      await global.driver.$(getLocatorValueFromJS(locator)).setValue(otp);
      await delay(2000);
    } else {
      const otpFields = global.driver.locator(getLocatorValueFromJS(locator));
      await otpFields.first().click();
      for (const digit of otp) {
        await global.driver.keyboard.type(digit);
        await delay(120);
      }
    }
  }
);

Given("user hovers on {string}", async (locator) => {
  if (isAppTest()) {
    await global.driver.$(getLocatorValueFromJS(locator)).moveTo();
  } else {
    await global.driver.locator(getLocatorValueFromJS(locator)).hover();
  }
});

Given("user right clicks on {string}", async (locator) => {
  if (isAppTest()) {
    await global.driver
      .$(getLocatorValueFromJS(locator))
      .click({ button: "right" });
  } else {
    await global.driver
      .locator(getLocatorValueFromJS(locator))
      .click({ button: "right" });
  }
});

Given("user double clicks on {string}", async (locator) => {
  if (isAppTest()) {
    await global.driver.$(getLocatorValueFromJS(locator)).doubleClick();
  } else {
    await global.driver.locator(getLocatorValueFromJS(locator)).dblclick();
  }
});

Given("user clicks on {string}", async (locator) => {
  if (isAppTest()) {
    await delay(1000);
    await global.driver.$(getLocatorValueFromJS(locator)).click();
    await delay(1000);
  } else {
    await global.driver.locator(getLocatorValueFromJS(locator)).click();
  }
});

Given("user unselects checkbox option {string}", async (locator) => {
  if (isAppTest()) {
    await global.driver.$(getLocatorValueFromJS(locator)).click();
  } else {
    await global.driver.locator(getLocatorValueFromJS(locator)).uncheck();
  }
});

Given("user selects checkbox option {string}", async (locator) => {
  if (isAppTest()) {
    await global.driver.$(getLocatorValueFromJS(locator)).click();
  } else {
    await global.driver.locator(getLocatorValueFromJS(locator)).check();
  }
});

Given("user selects radio box option {string}", async (locator) => {
  if (isAppTest()) {
    await global.driver.$(getLocatorValueFromJS(locator)).click();
  } else {
    await global.driver.locator(getLocatorValueFromJS(locator)).check();
  }
});

Given(
  "user selects option {string} from the dropdown {string}",
  async (optionToSelect, dropdownLocator) => {
    const data = await extractData(optionToSelect);
    if (isAppTest()) {
      await global.driver.$(getLocatorValueFromJS(dropdownLocator)).click();
      await global.driver.$(data).click();
    } else {
      await global.driver
        .locator(getLocatorValueFromJS(dropdownLocator))
        .selectOption(data);
    }
  }
);

Given(
  "user enters {string} into input {string} and presses enter",
  async (input, locator) => {
    const data = await extractData(input);
    if (isAppTest()) {
      const element = await global.driver.$(getLocatorValueFromJS(locator));
      await element.setValue(data);
      await delay(1000);
      await global.driver.keys("\uE007");
    } else {
      console.log("data to enter >>>" + data);
      await global.driver.locator(getLocatorValueFromJS(locator)).fill(data);
      await delay(2000);
      await global.driver.keyboard.press("Enter");
    }
  }
);

Given(
  "user verifies that the {string} should have text as {string}",
  async (locator, textToMatch) => {
    const textToMatchData = await extractData(textToMatch);
    if (isAppTest()) {
      await expect_mobile(
        await global.driver.$(getLocatorValueFromJS(locator)).getText()
      ).to.equal(textToMatchData);
    } else {
      await expect(
        await global.driver.locator(getLocatorValueFromJS(locator))
      ).toHaveText(textToMatchData);
    }
  }
);

Given("user verifies that the {string} is diabled", async (locator) => {
  if (isAppTest()) {
    await expect_mobile(
      await global.driver.$(getLocatorValueFromJS(locator)).isEnabled()
    ).to.be.false;
  } else {
    await expect(await global.driver.locator(getLocatorValueFromJS(locator)))
      .toBeDisabled;
  }
});

Given("user verifies that the {string} is enabled", async (locator) => {
  if (isAppTest()) {
    await expect_mobile(
      await global.driver.$(getLocatorValueFromJS(locator)).isEnabled()
    ).to.be.true;
  } else {
    await expect(await global.driver.locator(getLocatorValueFromJS(locator)))
      .toBeEnabled;
  }
});

Given(
  "user verifies that the {string} should have partial text as {string}",
  async (locator, textToMatch) => {
    const textToMatchData = await extractData(textToMatch);
    if (isAppTest()) {
      await expect_mobile(
        await global.driver.$(getLocatorValueFromJS(locator)).getText()
      ).to.contain(textToMatchData);
    } else {
      await expect(
        await global.driver.locator(getLocatorValueFromJS(locator))
      ).toContainText(textToMatchData);
    }
  }
);

Given("user verifies that the page has url as {string}", async (url) => {
  await expect(await global.driver).toHaveURL(url);
});

Given("user veriffies that the page has title as {string}", async (title) => {
  await expect(await global.driver).toHaveTitle(title);
});

Given("Verify radio button {string} is selected", async (locator) => {
  if (isAppTest()) {
    await expect_mobile(
      global.driver.$(getLocatorValueFromJS(locator)).isSelected()
    ).to.be.true;
  } else {
    await expect(
      await global.driver.locator(getLocatorValueFromJS(locator))
    ).toBeChecked();
  }
});

Given("Verify checkbox {string} is checked", async (locator) => {
  if (isAppTest()) {
    await expect_mobile(
      global.driver.$(getLocatorValueFromJS(locator)).isSelected()
    ).to.be.true;
  } else {
    await expect(
      await global.driver.locator(getLocatorValueFromJS(locator))
    ).toBeChecked();
  }
});

Given("Verify and element {string} is present", async (locator) => {
  if (isAppTest()) {
    await expect_mobile(
      global.driver.$(getLocatorValueFromJS(locator)).isDisplayed()
    ).to.be.true;
  } else {
    await expect(
      await global.driver.locator(getLocatorValueFromJS(locator))
    ).toBeVisible();
  }
});

Given("user scrolls the page by {int} pixels", async (int) => { });

Given("user takes a screenshot of the page", async () => {
  await global.driver.screenshot({
    path: "screenshots/" + testCase.pickle.name + ".png",
    fullPage: true,
  });
});

Given(
  "user takes a screenshot of the page and save with name {string}",
  async (screenShotName) => {
    await global.driver.screenshot({
      path: "screenshots/" + screenShotName + ".png",
      fullPage: true,
    });
  }
);

Then("user opens a new window", () => {
  // Write code here that turns the phrase above into concrete actions
});

Given("user opens and switches to new page", async () => {
  pages.set("opening page", global.driver);
  // page1 = global.driver;
  const browser = await chromium.launch({ headless: false });
  page2 = await (await browser.newContext()).newPage();
  pages.set("page 2", page2);
  global.driver = pages.get("page 2");
  await global.driver.goto("https://www.cat.com");
});

Given("user switches to page1", () => {
  global.driver = pages.get("opening page");
});

Given("user switches to page2", () => {
  global.driver = pages.get("page 2");
});

Given("user generates google otp", async () => {
  const { otp } = await TOTP.generate(
    "q6sfurseoikzzip4rpnyfi3oygoyo5xx"
  );
  console.log(otp);
});

Given("user dismisses alert box", async () => {
  await global.driver.on("dialog", async (dialog) => {
    await dialog.dismiss();
  });
});

Given("user accepts alert", async () => {
  await global.driver.on("dialog", async (dialog) => {
    await dialog.accept();
  });
});

Given(
  "user verifies that the alert text should be {string}",
  async (matchText) => {
    console.log(matchText);
    await global.driver.on("dialog", async (dialog) => {
      console.log(dialog.message);
      expect(await dialog.message()).toEqual(matchText);
    });
  }
);

Given(
  "user drags element {string} to the locator {string}",
  async (locatorTobeDragged, destinationLocator) => {
    await global.driver
      .locator(getLocatorValueFromJS(locatorTobeDragged))
      .dragTo(global.driver.locator(getLocatorValueFromJS(destinationLocator)));
  }
);

Given("user presses Enter key on element {string}", async (locator) => {
  await global.driver.locator(locator).press("Enter");
});

Given("user presses Enter key on page", async () => {
  await global.driver.keyboard.press("Enter");
});

Given(
  "user waits for {int} milliseconds",
  { timeout: 20000 },
  async (milliseconds) => {
    await global.driver.waitForTimeout(milliseconds); // Wait for the specified time
  }
);

Given("user extracts the ID from the current URL", async () => {
  const currentURL = await global.driver.url();
  setSharedData("extractedId", extractIdFromURL(currentURL));
});

function extractIdFromURL(url) {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

Given("user makes a POST request to the API endpoint", async () => {
  const url = "https://qa-arisflow-api.arisinfra.com/test-sigma/agent-link";
  let extractedId = getSharedData("extractedId");
  const requestBody = {
    flow: "Cq Rfq Add Vendor",
    objectId: extractedId,
    objectType: "requirement",
  };

  try {
    // Make a POST request using axios
    const response = await axios.post(url, requestBody, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    setSharedData("submitRateUrl", response?.data?.entity?.url || "");
    // submitRateUrl=response?.data?.entity?.url
    console.log("API Response:", response.data);
  } catch (error) {
    console.error("API request failed:", error.response.statusText);
  }
});

Given("user is redirected to a new page", async () => {
  let submitRateUrl = getSharedData("submitRateUrl");
  await global.driver.goto(submitRateUrl);
});

Given("user is redirected to a customer quotation page", async () => {
  let extractedId = getSharedData("extractedId");
  let url = `https://qa-arisflow-ui.arisinfra.com/customer-quotations/${extractedId}`;
  await global.driver.goto(url);
});

Given(
  "user saves value of  {string} with key {string}",
  async (locator, key) => {
    const text = await global.driver
      .locator(getLocatorValueFromJS(locator))
      .textContent();
    setSharedData(key, text);
  }
);

Given(
  "user makes a POST request to the API endpoint with {string} flow, object type {string}",
  { timeout: 8000 },
  async (flow, objectType) => {
    const url = "https://qa-arisflow-api.arisinfra.com/test-sigma/agent-link";
    let extractedId = getSharedData("extractedId");
    const requestBody = {
      flow,
      objectId: extractedId,
      objectType,
    };

    try {
      // Make a POST request using axios
      const response = await axios.post(url, requestBody, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      setSharedData("submitRateUrl", response?.data?.entity?.url || "");
      console.log("API Response:", response?.data);
    } catch (error) {
      console.error("API request failed:", error);
    }
  }
);

Given(
  "user find element {string} from captured {string}",
  async (locator, key) => {
    const getDataFromClipboard = getSharedData(key);
    const locatorValue = getLocatorValueFromJS(locator);
    const pattern = locatorValue.replace("{{key}}", getDataFromClipboard);
    await global.driver.locator(pattern).click();
  }
);

Given(
  "user enters value of key {string} into input {string} and presses enter",
  async (key, locator) => {
    await global.driver
      .locator(getLocatorValueFromJS(locator))
      .fill(getSharedData(key));
    await delay(3000);
    await global.driver.keyboard.press("Enter");
  }
);

Given("user hides the keyboard", async () => {
  await global.driver.hideKeyboard();
  await delay(3000);
});

Given(
  "user adds item with following data {string} {string} {string} {string} {string} {string}",
  async (category, name, grade, quantity, checkbox, description) => {
    await global.driver
      .locator(getLocatorValueFromJS("add item button"))
      .click();
    delay(2000);
    if (category) await inputDataandPressEnter(category, "item category");
    await inputDataandPressEnter(name, "item name");
    if (grade) await inputDataandPressEnter(grade, "item grade");
    if (quantity) await inputDataandPressEnter(quantity, "item quantity");
    if (checkbox)
      await global.driver
        .locator(getLocatorValueFromJS("item open quantity checkbox"))
        .check();
    await inputDataandPressEnter(description, "item description");
    await global.driver
      .locator(getLocatorValueFromJS("save item button"))
      .click();
  }
);

async function inputDataandPressEnter(input, locator) {
  const data = await extractData(input);
  await global.driver.locator(getLocatorValueFromJS(locator)).fill(data);
  await delay(1000);
  await global.driver.keyboard.press("Enter");
}

Given("fetch the whatsapp submit url for {string} flow", async (reqData) => {
  const url = "https://qa-arisflow-api.arisinfra.com/test-sigma/agent-link";
  let extractedId = getSharedData("extractedId");
  const data = await extractData(reqData);

  console.log("------------------reqData--", data, data.objectType, data.flow);
  const requestBody = {
    flow: data.flow,
    objectId: extractedId,
    objectType: data.objectType,
  };

  try {
    // Make a POST request using axios
    const response = await axios.post(url, requestBody, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    setSharedData("submitRateUrl", response?.data?.entity?.url || "");
    console.log("API Response:", response?.data);
  } catch (error) {
    console.error("API request failed:", error);
  }
});

Given("user opens a new page {string} and switches to it", async (pageName) => {
  const browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  let newPage = await (await browser.newContext({ viewport: null })).newPage();
  newPage.drivertype = "web";
  global.pages.set(pageName, newPage);
  global.driver = global.pages.get(pageName);
});

Given("user switches to page {string}", (pageToGetName) => {
  global.driver = global.pages.get(pageToGetName);
  console.log(global.pages.size);
});

Given("user uploads file {string} at {string}", async (filepath, locator) => {
  const fileChooserPromise = global.driver.waitForEvent("filechooser");
  await global.driver.locator(getLocatorValueFromJS(locator)).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(filepath);
});


Given('I navigate to {string}', async (url) => {
  await global.driver.goto(url);
 })
 
 Given('I click on {string}', async (button_name) => {
   await global.driver.getByRole('button',{name: button_name}).click();
 })
 


