const { chromium } = require("@playwright/test");
const { remote } = require("webdriverio");
const { timeouts } = require("../utils/timeout");
const { extractData } = require("../../lib/dataFactory");
const data = require("../../../../data/user-data/default.json");

async function createPlaywrightDriver() {
  if (data.config.implimentation) {
    const browser = await chromium.connectOverCDP("http://127.0.0.1:1234");
    const context = browser.contexts()[0];
    console.log("Connection established");
    const page = context.pages()[0] || (await context.newPage());
    page.setDefaultTimeout(timeouts.get("playwright_timeout"));
    return page;
  } else {
    console.log("Launching new browser");
    const browser = await chromium.launch({
      headless: data.config.headless,
      args: ["--start-maximized"],
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    page.setDefaultTimeout(timeouts.get("playwright_timeout"));
    return page;
  }
}


async function createAppiumDriver() {

  
  const opts = {
    path: "/",
    port: Number(await extractData("$appinfo.port")),
    capabilities: {
      'appium:options': {
      'automationName': await extractData("$appinfo.automationName"),
      },
      "platformName": await extractData("$appinfo.platformName"),
      "appium:deviceName": await extractData("$appinfo.deviceName"),
      "appium:app": process.cwd()+'/'+(await extractData("$appinfo.app")),
      "appium:appPackage": await extractData("$appinfo.appPackage"),
      "appium:appActivity": await extractData("$appinfo.appActivity"),
      "appium:noReset":true
    }
  };
  if (data.config.implimentation) {
    opts.capabilities["appium:noReset"]=true;
  }else{
    opts.capabilities["appium:noReset"]=true;
  }
  const driver = await remote(opts);
  return driver;
}

module.exports = { createPlaywrightDriver, createAppiumDriver };
